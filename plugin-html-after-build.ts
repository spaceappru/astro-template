import globby from "fast-glob";
import { JSDOM } from "jsdom";
import fs from "node:fs/promises";

import type { AstroIntegration } from "astro";

function removeComments(node: Node) {
  const children = node.childNodes;

  for (let i = children.length - 1; i >= 0; i--) {
    const child = children[i];

    if (child.nodeType === child.COMMENT_NODE) {
      node.removeChild(child);
    } else {
      removeComments(child);
    }
  }
}

export function htmlAfterBuild(): AstroIntegration {
  return {
    name: "html-after-build",
    hooks: {
      "astro:build:done": async ({}) => {
        const dateNow = String(Date.now()).substring(5);
        const htmlFiles = await globby(`build/*.html`);

        console.log(
          `[CSS Cache Update] Updating CSS cache-buster for ${htmlFiles.length} files...`,
        );

        await Promise.all(
          htmlFiles.map(async (file) => {
            let content = await fs.readFile(file, "utf-8");
            const dom = new JSDOM(content);
            const { document } = dom.window;
            const links = Array.from(document.head.querySelectorAll("link"));

            const styleLink = [...links]
              .reverse()
              .find((link) => link.rel === "stylesheet");

            if (styleLink) {
              let href = styleLink.getAttribute("href") || "";
              const cleanHref = href.split("?")[0];
              const newHref = `${cleanHref}?v=0.${dateNow}`;
              styleLink.setAttribute("href", newHref);
            }

            removeComments(document.documentElement);

            const updatedHtml = dom.serialize();
            await fs.writeFile(file, updatedHtml);
            console.log(`[CSS Cache Update] Processed ${file}`);
          }),
        );
      },
    },
  };
}
