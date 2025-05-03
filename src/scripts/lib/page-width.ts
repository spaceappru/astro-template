function setRealPageWidth() {
  document.documentElement.style.setProperty(
    "--real-page-width",
    `${document.documentElement.clientWidth}px`,
  );
}

/**
 * Расчёт ширины страницы для Section
 */
export function initPageWidth() {
  setRealPageWidth();

  window.addEventListener("resize", setRealPageWidth);
}
