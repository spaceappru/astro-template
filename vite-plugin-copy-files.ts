// vite-plugin-copy-files.ts
import type { Plugin } from "vite";
import fs from "fs-extra";
import path from "path";

interface CopyFilesOptions {
  sourceDir: string;
  destDir: string;
  flatten?: boolean; // Optional: Whether to flatten the directory structure
}

function copyFiles(options: CopyFilesOptions): Plugin {
  return {
    name: "copy-files",
    apply: "build", // Apply this plugin after the build
    async closeBundle() {
      try {
        if (!fs.existsSync(options.sourceDir)) {
          console.warn(
            `[copy-files] Source directory does not exist: ${options.sourceDir}`
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
        //   console.log(`[copy-files] Copied ${sourcePath} to ${destPath}`);
        }
        // console.log(
        //   `[copy-files] Successfully copied files from ${options.sourceDir} to ${options.destDir}`
        // );
      } catch (err) {
        console.error("[copy-files] Error copying files:", err);
      }
    },
  };
}

export default copyFiles;
