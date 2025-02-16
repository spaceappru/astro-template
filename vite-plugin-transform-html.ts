import type { AstroIntegration } from "astro";
import fs from "node:fs/promises";
import path from "node:path";

export default function myPlugin(): AstroIntegration {
  return {
    name: "my-astro-plugin",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const version = Math.random().toString(36).substring(2, 10);
        const files = await fs.readdir(dir.pathname.slice(3));

        for (const file of files) {
          if (path.extname(file) === ".html") {
            console.log(1);
            const filePath = path.join(dir.pathname.slice(3), file);
            let content = await fs.readFile(filePath, "utf-8");
            console.log(filePath);

            const regex =
              /<link rel="stylesheet" href="\.\/css\/custom-style\.css" \/>/g;
            content = content.replace(
              regex,
              `<link rel="stylesheet" href="./css/custom-style.css?v=${version}" />`
            );

            await fs.writeFile(filePath, content);
            logger.info(`Updated ${file} with version ${version}`);
          }
        }
      },
    },
  };
}
