import {render, replace} from "../utils/render";
import TripEvent from "../components/event";
import EventForm from "../components/form";
import TripDay from "../components/day";
import Sort from "../components/sort";
import TripDays from "../components/days";
import NoEvents from "../components/noEvents";

const renderEvent = (tripDayEventsElement, event) => {
  const tripEvent = new TripEvent(event);
  const eventForm = new EventForm(event);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
    if (isEscKey) {
      replace(tripEvent, eventForm);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripEvent.setEditButtonClickHandler(() => {
    replace(eventForm, tripEvent);
    document.addEventListener(`keydown`, onEscKeyDown);
  });
  eventForm.setFormSubmitHandler(() => {
    replace(tripEvent, eventForm);
  });
  eventForm.setCancelButtonClickHandler(() => {
    replace(tripEvent, eventForm);
  });

  render(tripDayEventsElement, tripEvent);
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noEvents = new NoEvents();
    this._sort = new Sort();
    this._form = new EventForm();
    this._tripDays = new TripDays();
  }

  render(trip) {
    const container = this._container;

    if (trip.length === 0) {
      render(container, this._noEvents);
      return;
    }

    render(container, this._form);
    render(container, this._sort);
    render(container, this._tripDays);

    const tripDaysElement = container.querySelector(`.trip-days`);
    let currentDate;
    let dayNumber = 0;
    for (let event of trip) {
      if (currentDate !== event.dateStart) {
        dayNumber++;
        const tripDay = new TripDay(dayNumber, event.dateStart);
        render(tripDaysElement, tripDay);
        currentDate = event.dateStart;
      }
      const tripDayEventsElement = tripDaysElement.querySelector(`.trip-days__item:nth-child(${dayNumber}) .trip-events__list`);

      renderEvent(tripDayEventsElement, event);
    }
  }
}
