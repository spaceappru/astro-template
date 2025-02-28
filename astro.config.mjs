// @ts-check
import { defineConfig } from "astro/config";
import FullReload from "vite-plugin-full-reload";
import { run } from "vite-plugin-run";
import relativeLinks from "astro-relative-links";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [relativeLinks()],
  trailingSlash: "never",
  devToolbar: { enabled: false },
  build: {
    format: "file",
    inlineStylesheets: "never",
  },
  outDir: "build",
  scopedStyleStrategy: "class",
  vite: {
    plugins: [
      FullReload(["src/public/js/**/*.js"]),
      run([
        {
          name: "typescript transform",
          run: ["vite build --config vite-ts.config.ts"],
          pattern: ["src/scripts/**/*.ts", "src/scripts/**/*.svelte"],
        },
      ]),
      tailwindcss(),
    ],
    build: {
      assetsInlineLimit: 0,
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          hashCharacters: "hex",
          assetFileNames: ({ names }) => {
            if (names[0].includes("style")) return "css/custom-style.css";
            if (names[0].includes("css")) return "css/[name].css";
            if (names[0].includes("js")) return "js/name-[hash].js";
            return "other/[name]-[hash][extname]";
          },
        },
      },
    },
    css: {
      devSourcemap: true,
      modules: false,
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
          additionalData: '@use "/src/styles/mixins.scss" as *;',
        },
      },
    },
  },
});
