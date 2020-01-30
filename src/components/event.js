import {castTimeFormat} from "../utils/common";
import AbstractComponent from './abstract-component.js';

export default class TripEvent extends AbstractComponent {
  constructor(event) {
    super();
    this._event = event;
  }

  getTemplate() {
    const formatTime = (date) => {
      const hours = castTimeFormat(date.getHours());
      const minutes = castTimeFormat(date.getMinutes());

      return `${hours}:${minutes}`;
    };

    const getDurationString = (duration) => {
      let timeLeft = duration;
      const days = Math.floor(timeLeft / (24 * 60 * 60 * 1000));
      timeLeft = timeLeft - days * 24 * 60 * 60 * 1000;
      const hours = Math.floor(timeLeft / (60 * 60 * 1000)) % 24;
      timeLeft = timeLeft - hours * 60 * 60 * 1000;
      const minutes = Math.floor(timeLeft / (60 * 1000)) % 24 % 60;
      let durationString = ``;
      if (days > 0) {
        durationString += `${days}D `;
      }
      if (hours > 0) {
        durationString += `${hours}H `;
      }
      if (minutes > 0) {
        durationString += `${minutes}M`;
      }

      return (durationString);
    };

    const createOffersTemplate = (offers) => {
      let offersTemplate = ``;

      if (offers.length > 0) {
        offersTemplate = `<ul class="event__selected-offers">`;
        for (let offer of offers) {
          offersTemplate += `<li class="event__offer">
            <span class="event__offer-title">${offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>`;
        }
        offersTemplate += `</ul>`;
      }

      return offersTemplate;
    };

    return (
      `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._event.type.replace(` `, `-`)}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._event.type} at ${this._event.name}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${this._event.dateStart.toISOString()}">${formatTime(this._event.dateStart)}</time>
            &mdash;
            <time class="event__end-time" datetime="${this._event.dateEnd.toISOString()}">${formatTime(this._event.dateEnd)}</time>
          </p>
          <p class="event__duration">${getDurationString(this._event.duration)}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._event.price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        ${createOffersTemplate(this._event.offers)}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
    );
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
