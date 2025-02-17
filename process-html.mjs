import fs from "node:fs/promises";
import { globby } from "globby";
import { JSDOM } from "jsdom";

let html = await globby(`build/*.html`);

await Promise.all(
  html.map(async (file) => {
    let dateNow = String(Date.now()).substring(5);

    console.log("Processing file:", file);
    let html = await fs.readFile(file, "utf-8");
    let dom = new JSDOM(html);
    let head = dom.window.document.head;
    let headings = head.querySelectorAll("link");

    let style = headings[headings.length - 1];
    style.setAttribute("href", `./css/style.css?v=0.${dateNow}`);

    html = dom.serialize();

    await fs.writeFile(file, html);
  })
);
