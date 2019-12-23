import {createElement} from '../utils.js';

export default class Menu {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    const menuNames = [
      `Table`, `Stats`
    ];
    let menuTemplate = ``;

    for (let [index, name] of menuNames.entries()) {
      menuTemplate += `<a class="trip-tabs__btn${index === 0 ? ` trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
    }

    return (
      `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuTemplate}
      </nav>`
    );
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
