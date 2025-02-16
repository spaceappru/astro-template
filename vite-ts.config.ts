import { defineConfig } from "vite";
import vitePluginMultiEntry from "./vite-plugin-multi-entry";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vitePluginMultiEntry({
      entryDir: "src/scripts/pages",
      formats: ["es"],
      name: "space-app",
      outputDir: "public/js",
    }),
  ],
});
