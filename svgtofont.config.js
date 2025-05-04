/**
 * @type {import('svgtofont').SvgToFontOptions}
 */
export default {
  fontName: "icons",
  src: "./public/icons",
  dist: "./public/fonts/icons",
  typescript: true,
  outSVGReact: false,
  classNamePrefix: "icon",
  emptyDist: true,
  css: { include: "css" },
  website: {
    title: "Иконки",
  },
};
