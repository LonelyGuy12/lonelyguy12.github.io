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
    // Split vendors into separate cacheable chunks
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("three") || id.includes("@react-three")) return "three-vendor";
          if (id.includes("framer-motion")) return "framer-vendor";
          if (id.includes("lenis")) return "lenis-vendor";
          if (id.includes("node_modules")) return "vendor";
        },
      },
    },
  },
});
