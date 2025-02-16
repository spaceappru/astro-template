import glob from "fast-glob";
import { rmSync } from "fs";
import path from "path";
import type { InputOption } from "rollup";
import type { LibraryFormats, Plugin } from "vite";

interface Options {
  entryDir: string;
  formats?: LibraryFormats[];
  name?: string;
  outputDir?: string;
}

interface Options {
  entryDir: string;
  formats?: LibraryFormats[]; // Optional, defaults to ['es', 'umd']
  name?: string; // Optional, defaults to 'MyLibrary'
  cleanOutDir?: boolean; // Optional, defaults to true
}

function multiEntryPlugin(options: Options): Plugin {
  const formats: LibraryFormats[] = options.formats || ["es", "umd"];
  const name: string = options.name || "MyLibrary";
  const cleanOutDir: boolean = options.cleanOutDir !== false; // Default to true

  let input: InputOption = {}; // Store the input option
  let previousEntryFiles: string[] = []; // Store previous entry files

  async function updateInputOption() {
    const entryFiles = await glob(`${options.entryDir}/**/*.ts`);
    const newInput: Record<string, string> = {}; // Use a simple object

    entryFiles.forEach((file) => {
      const name = path.basename(file, ".ts");
      newInput[name] = file;
    });

    input = newInput;

    return entryFiles; // Return the current entry files
  }

  return {
    name: "vite-plugin-multi-entry",
    config: async (config) => {
      const entryFiles = await updateInputOption(); // Initial update
      previousEntryFiles = entryFiles; // Store initial entry files

      config.build = config.build || {};
      config.build.lib = config.build.lib || {
        entry: {}, // Provide an empty entry object
        name: name,
        formats: formats,
        fileName: (_format: string, entryName: string) => `${entryName}.js`,
      };

      config.build.rollupOptions = config.build.rollupOptions || {};
      config.build.rollupOptions.input = input;

      if (options.outputDir) config.build.outDir = options.outputDir;
      config.build.copyPublicDir = false;

      return config;
    },
    buildStart: async () => {
      if (cleanOutDir) {
        const outDir = options.outputDir || "dist"; // Default to 'dist'
        try {
          rmSync(outDir, { recursive: true, force: true });
        } catch (error) {
          console.error(
            `[vite-plugin-multi-entry] Ошибка при очистке папки ${outDir}:`,
            error
          );
        }
      }

      const entryFiles = await updateInputOption(); // Update before each build
      previousEntryFiles = entryFiles; // Update previous entry files
    },
    async handleHotUpdate(ctx) {
      const entryFiles = await updateInputOption(); // Update entry files

      // Find removed files
      const removedFiles = previousEntryFiles.filter(
        (file) => !entryFiles.includes(file)
      );

      // Emit file deletion events
      removedFiles.forEach((file) => {
        const name = path.basename(file, ".ts");
        ctx.server.moduleGraph.invalidateAll();
        ctx.server.ws.send({
          type: "update",
          updates: [],
        });
      });

      previousEntryFiles = entryFiles; // Update previous entry files

      return [];
    },
  };
}

export default multiEntryPlugin;
