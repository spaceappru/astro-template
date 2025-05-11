import { svelte } from "@sveltejs/vite-plugin-svelte";
import glob from "fast-glob"; // install with `npm install glob`
import path from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { copyPublicJs } from "./plugin-copy-public-js";

// https://vite.dev/config/
export default defineConfig({
  define: {
    "process.env.NODE_ENV": "production",
  },
  plugins: [
    tsconfigPaths(),
    svelte(),
    copyPublicJs({
      sourceDir: "public/js",
      destDir: "build/js",
    }),
  ],

  envPrefix: ["PUBLIC_"],

  build: {
    outDir: "public/js",
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      input: {
        ...Object.fromEntries(
          glob
            .sync("src/scripts/entity/*.ts")
            .map((file) => [
              path.relative(
                "src/scripts/entity",
                file.slice(0, file.length - path.extname(file).length),
              ),
              path.resolve(__dirname, file),
            ]),
        ),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "assets/[name].[ext]",
        format: "esm",
      },
    },

    minify: "esbuild",
  },
  esbuild: {
    legalComments: "none",
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
  },
});
