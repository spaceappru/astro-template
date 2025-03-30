import IMask, { type MaskedPatternOptions } from "imask";
import "imask/masked/pattern";

const maskOptions: MaskedPatternOptions = {
  mask: "+{7} (000) 000-00-00",
};

/**
 * Добавление маски телефона на список элементов
 */
function maskPhone(elements: NodeListOf<Element>) {
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      IMask(element, maskOptions);
    }
  });
}

/**
 * Инпуты телефон
 */
const phone = document.querySelectorAll(".input--phone");

maskPhone(phone);
