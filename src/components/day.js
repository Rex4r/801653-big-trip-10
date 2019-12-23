import {createElement} from "../utils";

export default class TripDay {
  constructor(dayNumber, eventDate) {
    this._dayNumber = dayNumber;
    this._eventDate = eventDate;
    this._element = null;
  }

  getTemplate() {
    const dateOption = {
      month: `short`,
      day: `numeric`
    };
    const toYYYYMMDDFormat = (dayDate) => {
      return dayDate.toISOString().slice(0, 10);
    };
    const toMMMDDFormat = (dayDate) => {
      return dayDate.toLocaleString(`en-US`, dateOption);
    };

    return (
      `<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">${this._dayNumber}</span>
        <time class="day__date" datetime="${toYYYYMMDDFormat(this._eventDate)}">${toMMMDDFormat(this._eventDate)}</time>
      </div>

      <ul class="trip-events__list"></ul>
    </li>`
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
