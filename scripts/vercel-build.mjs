#!/usr/bin/env node
/**
 * Vercel Build Output API v3
 * Builds the TanStack Start app and structures output for Vercel deployment.
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

// ── 5. Copy server bundle into the function ─────────────────────────────────
console.log("Setting up serverless function...");
cpSync("dist/server", ".vercel/output/functions/index.func", { recursive: true });

// ── 6. Create the Node.js request handler wrapper ───────────────────────────
writeFileSync(
  ".vercel/output/functions/index.func/handler.mjs",
  `
import serverEntry from "./server.js";

export default async function handler(req, res) {
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
      req.on("data", (chunk) => chunks.push(chunk));
      req.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  const request = new Request(url, { method: req.method, headers, body });
  const response = await serverEntry.fetch(request);

  res.statusCode = response.status;
  for (const [key, value] of response.headers.entries()) {
    res.setHeader(key, value);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
`.trimStart()
);

// ── 7. Vercel function config ────────────────────────────────────────────────
writeFileSync(
  ".vercel/output/functions/index.func/.vc-config.json",
  JSON.stringify({
    runtime: "nodejs22.x",
    handler: "handler.mjs",
    launchWorker: true,
  }, null, 2)
);

// ── 8. Vercel output config ──────────────────────────────────────────────────
writeFileSync(
  ".vercel/output/config.json",
  JSON.stringify({
    version: 3,
    routes: [
      // Static assets — cache forever
      {
        src: "/assets/(.+)",
        headers: { "cache-control": "public, max-age=31536000, immutable" },
        continue: true,
      },
      // SW — never cache
      {
        src: "/sw.js",
        headers: { "cache-control": "no-cache, no-store, must-revalidate" },
        continue: true,
      },
      // Serve static files if they exist
      { handle: "filesystem" },
      // Everything else → SSR function
      { src: "/(.*)", dest: "/index" },
    ],
  }, null, 2)
);

console.log("✓ Vercel output ready at .vercel/output");
