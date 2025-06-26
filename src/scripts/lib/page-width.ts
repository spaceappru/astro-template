function setRealPageWidth() {
  const page = document.documentElement;
  page.style.setProperty("--real-page-width", `${page.clientWidth}px`);
}

/**
 * Расчёт ширины страницы для Section
 */
export function initPageWidth() {
  setRealPageWidth();
  window.addEventListener("resize", setRealPageWidth);
}
