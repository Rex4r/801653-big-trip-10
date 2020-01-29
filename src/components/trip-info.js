import AbstractComponent from './abstract-component.js';

export default class TripInfo extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    const createCitiesString = () => {
      const cities = this._events.map((event) => {
        return event.name;
      });

      return cities.join(` &mdash; `);
    };

    const createDateString = (dateStart, dateEnd) => {
      return (
        `${dateStart.toLocaleString(`en-US`, {month: `short`})} ${dateStart.getDate()}&nbsp;&mdash;&nbsp;${dateStart.getMonth() !== dateEnd.getMonth() ? dateEnd.toLocaleString(`en-US`, {month: `short`}) : ``} ${dateEnd.getDate()}`
      );
    };

    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">${createCitiesString()}</h1>

        <p class="trip-info__dates">${createDateString(this._events[0].dateStart, this._events[this._events.length - 1].dateEnd)}</p>
      </div>`
    );
  }
}
