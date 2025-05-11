/**
 * Получение бокового отступа внутри Section
 */
export function getSectionOffset(selector: string) {
  const element = document.querySelector(selector);

  if (element instanceof HTMLElement) {
    const container = window
      .getComputedStyle(element)
      .getPropertyValue("--_container")
      .slice(0, -2);

    const padding = window
      .getComputedStyle(element)
      .getPropertyValue("--container-padding")
      .slice(0, -2);

    const width = window
      .getComputedStyle(element)
      .getPropertyValue("--real-page-width")
      .slice(0, -2);

    if (!window.matchMedia("(min-width: 640px)").matches) {
      return +padding;
    }

    return Math.max((+width - +container) / 2, +padding);
  }

  return 0;
}
