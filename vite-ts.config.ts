import { defineConfig } from "vite";
import copyFiles from "./vite-plugin-copy-files";
import vitePluginMultiEntry from "./vite-plugin-multi-entry";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    svelte(),
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
