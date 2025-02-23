import IMask from "imask/holder";
import "imask/masked/pattern";

const maskOptions = {
  mask: "+{7}(000) 000-00-00",
};

/**
 * Добавление маски телефона на список элементов
 */
export function maskPhone(elements: NodeListOf<Element>) {
  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      IMask(element, maskOptions);
    }
  });
}

const phone = document.querySelectorAll(".input--phone");

maskPhone(phone);
