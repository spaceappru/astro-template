import fs from "fs-extra";
import path from "path";
import type { Plugin } from "vite";

interface CopyFilesOptions {
  sourceDir: string;
  destDir: string;
  flatten?: boolean; // Optional: Whether to flatten the directory structure
}

export function copyPublicJs(options: CopyFilesOptions): Plugin {
  return {
    name: "copy-files",
    apply: "build", // Apply this plugin after the build
    async closeBundle() {
      try {
        if (!fs.existsSync(options.sourceDir)) {
          console.warn(
            `[copy-files] Source directory does not exist: ${options.sourceDir}`,
          );
          return;
        }

        fs.ensureDirSync(options.destDir);
        const files = fs.readdirSync(options.sourceDir);

        for (const file of files) {
          const sourcePath = path.join(options.sourceDir, file);
          const destPath = options.flatten
            ? path.join(options.destDir, file)
            : path.join(options.destDir, file);

          fs.copySync(sourcePath, destPath, {
            overwrite: true,
          });
        }
      } catch (err) {
        console.error("[copy-files] Error copying files:", err);
      }
    },
  };
}
