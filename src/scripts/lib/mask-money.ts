import IMask, { type MaskedNumberOptions } from "imask";
import "imask/masked/number";

export const maskOptions: MaskedNumberOptions = {
  mask: Number,
  thousandsSeparator: " ",
  padFractionalZeros: false,
  normalizeZeros: true,
  radix: ".",
  mapToRadix: ["."],
  autofix: true,
  max: 999999999999999,
};

/**
 * Добавление маски денег на список элементов
 */
function maskMoney(elements: NodeListOf<Element>) {
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      IMask(element, maskOptions);
    }
  });
}

/**
 * Инпуты денег
 */
const money = document.querySelectorAll(".input--money");

maskMoney(money);
