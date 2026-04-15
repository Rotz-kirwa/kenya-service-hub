#!/usr/bin/env node
/**
 * Vercel Build Output API v3
 * Builds TanStack Start and bundles the SSR server for Vercel deployment.
 */
import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from "node:fs";

// ── 1. Clean previous output ────────────────────────────────────────────────
if (existsSync(".vercel/output")) {
  rmSync(".vercel/output", { recursive: true, force: true });
}

// ── 2. Build the app ────────────────────────────────────────────────────────
console.log("Building app...");
execSync("bun run build", { stdio: "inherit" });

// ── 3. Set up Vercel output structure ───────────────────────────────────────
mkdirSync(".vercel/output/static", { recursive: true });
mkdirSync(".vercel/output/functions/index.func", { recursive: true });

// ── 4. Copy static client assets ────────────────────────────────────────────
console.log("Copying static assets...");
cpSync("dist/client", ".vercel/output/static", { recursive: true });

// ── 5. Bundle server + all deps into one file ───────────────────────────────
console.log("Bundling server...");
execSync(
  [
    "bun build dist/server/server.js",
    "--outfile .vercel/output/functions/index.func/server.mjs",
    "--target node",
    "--format esm",
    "--external node:*",   // keep Node.js built-ins as-is
    "--minify-whitespace", // smaller bundle
  ].join(" "),
  { stdio: "inherit" }
);

// ── 6. Copy server assets (manifest, route chunks) ──────────────────────────
if (existsSync("dist/server/assets")) {
  cpSync("dist/server/assets", ".vercel/output/functions/index.func/assets", {
    recursive: true,
  });
}

// ── 7. Node.js request handler ──────────────────────────────────────────────
writeFileSync(
  ".vercel/output/functions/index.func/handler.mjs",
  `import serverEntry from "./server.mjs";

export default async function handler(req, res) {
  try {
    const protocol = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers["x-forwarded-host"] || req.headers.host;
    const url = \`\${protocol}://\${host}\${req.url}\`;

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    }

    let body = undefined;
    if (req.method !== "GET" && req.method !== "HEAD") {
      body = await new Promise((resolve) => {
        const chunks = [];
        req.on("data", (c) => chunks.push(c));
        req.on("end", () => resolve(Buffer.concat(chunks)));
      });
    }

    const response = await serverEntry.fetch(new Request(url, { method: req.method, headers, body }));

    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    console.error("SSR error:", err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
`
);

// ── 8. Vercel function config ────────────────────────────────────────────────
writeFileSync(
  ".vercel/output/functions/index.func/.vc-config.json",
  JSON.stringify({ runtime: "nodejs22.x", handler: "handler.mjs" }, null, 2)
);

// ── 9. Vercel output config ──────────────────────────────────────────────────
writeFileSync(
  ".vercel/output/config.json",
  JSON.stringify(
    {
      version: 3,
      routes: [
        {
          src: "/assets/(.+)",
          headers: { "cache-control": "public, max-age=31536000, immutable" },
          continue: true,
        },
        {
          src: "/sw.js",
          headers: { "cache-control": "no-cache, no-store, must-revalidate" },
          continue: true,
        },
        { handle: "filesystem" },
        { src: "/(.*)", dest: "/index" },
      ],
    },
    null,
    2
  )
);

console.log("✓ Vercel output ready at .vercel/output");
