// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Self-hosted builds (Hostinger Node.js) need a Node server; Lovable's own builds override the preset.
// Hashed build files never change, so browsers may keep them for a year. The config type only
// lists a few Nitro keys, but every key here is passed through to Nitro unchanged.
const selfHostedNitro = {
  preset: "node-server",
  routeRules: {
    "/assets/**": { headers: { "cache-control": "public, max-age=31536000, immutable" } },
  },
} as { preset: string };

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: selfHostedNitro,
});
