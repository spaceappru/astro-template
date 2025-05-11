import type { AstroIntegration } from "astro";
import type { FSWatcher } from "node:fs";
import fs from "node:fs";
import path from "node:path";

interface FileListerPluginOptions {
  inputDir?: string;
  outputFile?: string;
  recursive?: boolean;
  watch?: boolean;
}

export function developmentEntity(
  options?: FileListerPluginOptions,
): AstroIntegration {
  const resolvedOptions = {
    inputDir: options?.inputDir || "./src",
    outputFile: options?.outputFile || "./src/generated/file-list.ts",
    recursive: options?.recursive ?? true,
    watch: options?.watch ?? true,
  };

  let watcher: FSWatcher | undefined;

  return {
    name: "development-entity",
    hooks: {
      "astro:config:setup": async ({ command, logger }) => {
        const generateFileList = () => {
          try {
            const files = getFiles(
              resolvedOptions.inputDir,
              resolvedOptions.recursive,
            );

            // Ensure output directory exists
            const outputDir = path.dirname(resolvedOptions.outputFile);
            if (!fs.existsSync(outputDir)) {
              fs.mkdirSync(outputDir, { recursive: true });
            }

            const entities = files.map(
              (e) => `import "./entity/${path.parse(e).name}";`,
            );
            // Write as TS imports
            fs.writeFileSync(
              resolvedOptions.outputFile,
              ["/** Автоматически сгенерированный файл */\n"]
                .concat(entities)
                .join("\n"),
              "utf8",
            );

            logger.info(
              `Generated file list at ${resolvedOptions.outputFile} (${files.length} files)`,
            );
          } catch (error) {
            logger.error(
              "Error generating file list: " +
                (error instanceof Error ? error.message : String(error)),
            );
          }
        };

        // Generate initial file list
        generateFileList();

        if (command === "dev" && resolvedOptions.watch) {
          // Set up watcher only in dev mode
          watcher = fs.watch(
            resolvedOptions.inputDir,
            { recursive: resolvedOptions.recursive },
            () => {
              generateFileList();
            },
          );
        }
      },

      "astro:server:start": () => {
        // No-op here, setup already done
      },

      "astro:server:done": () => {
        if (watcher) {
          watcher.close();
        }
      },
    },
  };
}

function getFiles(dir: string, recursive: boolean): string[] {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const files = dirents.flatMap((dirent) => {
    const res = path.resolve(dir, dirent.name);
    if (recursive && dirent.isDirectory()) {
      return getFiles(res, recursive);
    } else if (dirent.isFile()) {
      return [path.relative(dir, res)];
    }
    return [];
  });
  return files;
}
