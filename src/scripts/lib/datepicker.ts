/**
 * https://vanilla-calendar.pro/ru/docs/learn
 */

import { Calendar, type Options } from "vanilla-calendar-pro";
import { formatDate } from "./format-date";

const options: Options = {
  inputMode: true,
  positionToInput: "auto",
  locale: "ru-RU",
  onChangeToInput(self) {
    if (!self.context.inputElement) return;
    if (self.context.selectedDates[0]) {
      self.context.inputElement.value = formatDate(
        self.context.selectedDates[0]
      );
      self.hide();
    } else {
      self.context.inputElement.value = "";
    }
  },
};

const datepickers = document.querySelectorAll(".js-calendar");

datepickers.forEach((input) => {
  if (input instanceof HTMLElement) {
    const calendarInput = new Calendar(input, options);
    calendarInput.init();
  }
});
