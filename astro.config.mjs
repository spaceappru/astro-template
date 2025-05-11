// @ts-check
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import relativeLinks from "astro-relative-links";
import { defineConfig } from "astro/config";
import { developmentEntity } from "./plugin-development-entity";
import { htmlAfterBuild } from "./plugin-html-after-build";

// https://astro.build/config
export default defineConfig({
  integrations: [
    relativeLinks(),
    developmentEntity({
      inputDir: "src/scripts/entity",
      outputFile: "src/scripts/dev.ts",
      recursive: true,
      watch: true,
    }),
    htmlAfterBuild(),
  ],
  trailingSlash: "never",
  devToolbar: { enabled: false },
  build: {
    format: "file",
    inlineStylesheets: "never",
  },
  outDir: "build",
  scopedStyleStrategy: "class",
  vite: {
    optimizeDeps: { exclude: ["melt/builders"] },
    plugins: [svelte(), tailwindcss()],
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
