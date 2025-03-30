/**
 * Опции для селекта: https://github.com/Choices-js/Choices?tab=readme-ov-file#setup
 */

import Choices, { type ClassNames } from "choices.js";

const classNames: ClassNames = {
  containerOuter: ["select"],
  containerInner: ["select__inner"],
  input: ["select__input"],
  inputCloned: ["select__input--cloned"],
  list: ["select__list"],
  listItems: ["select__list--multiple"],
  listSingle: ["select__list--single"],
  listDropdown: ["select__list--dropdown"],
  item: ["select__item"],
  itemSelectable: ["select__item--selectable"],
  itemDisabled: ["select__item--disabled"],
  itemChoice: ["select__item--choice"],
  description: ["select__description"],
  placeholder: ["select__placeholder"],
  group: ["select__group"],
  groupHeading: ["select__heading"],
  button: ["select__button"],
  activeState: ["is-active"],
  focusState: ["is-focused"],
  openState: ["is-open"],
  disabledState: ["is-disabled"],
  highlightedState: ["is-highlighted"],
  selectedState: ["is-selected"],
  flippedState: ["is-flipped"],
  loadingState: ["is-loading"],
  notice: ["select__notice"],
  addChoice: ["select__item--selectable", "add-choice"],
  noResults: ["has-no-results"],
  noChoices: ["has-no-choices"],
};

const selects = document.querySelectorAll(".js-choice");

selects.forEach((select) => {
  if (select instanceof HTMLSelectElement) {
    const choices = new Choices(select, {
      searchEnabled: false,
      itemSelectText: undefined,
      classNames,
    });
  }
});
