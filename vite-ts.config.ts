import { defineConfig } from "vite";
import copyFiles from "./vite-plugin-copy-files";
import vitePluginMultiEntry from "./vite-plugin-multi-entry";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vitePluginMultiEntry({
      entryDir: "src/scripts/entity",
      formats: ["es"],
      name: "space-app",
      outputDir: "public/js",
    }),

    copyFiles({
      sourceDir: "public/js",
      destDir: "build/js",
    }),
  ],
});
