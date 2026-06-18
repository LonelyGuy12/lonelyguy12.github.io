import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Standalone Vite config for building a static SPA — used for GitHub Pages deployment.
// This bypasses TanStack Start's SSR/Nitro setup entirely.
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist-spa",
  },
});
