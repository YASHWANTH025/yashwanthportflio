// The build integration already includes these — do not add them manually or plugins will duplicate:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { env } from "node:process";

const isGitHubPages = env["GITHUB_PAGES"] === "true";

export default defineConfig({
  vite: {
    base: isGitHubPages ? "/yashwanthportflio/" : "/",
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    router: {
      basepath: isGitHubPages ? "/yashwanthportflio" : "/",
    },
    ...(isGitHubPages && {
      prerender: {
        enabled: true,
        crawlLinks: false,
        failOnError: true,
      },
    }),
  },
});
