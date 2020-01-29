import AbstractComponent from './abstract-component.js';

export default class Menu extends AbstractComponent {
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
}
