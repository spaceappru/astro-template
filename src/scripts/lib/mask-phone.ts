import type { MaskedPatternOptions } from "imask";
import IMask from "imask/holder";
import "imask/masked/pattern";

const maskOptions: MaskedPatternOptions = {
  mask: "+{7} (\\900) 000-00-00",
  prepare: function (value, mask) {
    if (mask.value === "" && value.startsWith("8")) {
      return "7" + value.slice(1);
    }
    return value;
  },
};

/**
 * Добавление маски телефона на список элементов
 */
function maskPhone(elements: NodeListOf<Element>) {
  elements.forEach((element) => {
    if (element instanceof HTMLInputElement) {
      const mask = IMask(element, maskOptions);

      element.addEventListener("paste", (e) => {
        e.preventDefault();
        //@ts-ignore
        const paste = (e.clipboardData || window.clipboardData).getData("text");

        let cleanValue = paste.replace(/\D/g, "");

        if (cleanValue[0] === "8") {
          cleanValue = cleanValue.slice(1);
        }

        mask.value = "+" + cleanValue;
        mask.updateValue();
        mask.updateControl();

        element.setSelectionRange(element.value.length, element.value.length);
      });
    }
  });
}

/**
 * Инпуты телефон
 */
const phone = document.querySelectorAll(".input--phone");

maskPhone(phone);
