import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Vite config: React support + Tailwind CSS support.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React itself barely ever changes between our own deploys, so it goes in its
          // own file. Visitors then only re-download OUR code (usually much smaller) after
          // an update, instead of React too — their browser already has this file cached.
          "react-vendor": ["react", "react-dom", "react-router"],
        },
      },
    },
  },
});
