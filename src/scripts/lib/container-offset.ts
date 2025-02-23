export function containerOffset() {
  const width = window.innerWidth;

  if (width > 1346) return (width - 1306) / 2;
  if (width < 769) return (width - 640) / 2 > 20 ? (width - 640) / 2 : 20;
  if (width < 993) return (width - 920) / 2 > 20 ? (width - 920) / 2 : 20;

  return 20;
}

document.documentElement.style.setProperty(
  "--container-offset",
  containerOffset() + "px"
);

window.addEventListener("resize", () => {
  document.documentElement.style.setProperty(
    "--container-offset",
    containerOffset() + "px"
  );
});
