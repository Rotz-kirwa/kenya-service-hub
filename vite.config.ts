import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Only load the Cloudflare plugin when building for Cloudflare Workers.
// Vercel and local dev do not set CF_PAGES, so the plugin is skipped.
const isCloudflare = !!process.env.CF_PAGES;

export default defineConfig(async () => {
  const plugins: any[] = [
    tsconfigPaths(),
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    tanstackStart(),
    react(),
  ];

  if (isCloudflare) {
    const { cloudflare } = await import("@cloudflare/vite-plugin");
    plugins.push(cloudflare());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
