import AbstractComponent from './abstract-component.js';

export default class TripDay extends AbstractComponent {
  constructor(dayNumber, eventDate) {
    super();
    this._dayNumber = dayNumber;
    this._eventDate = eventDate;
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
}
