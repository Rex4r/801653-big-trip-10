import TripInfo from "./components/trip-info.js";
import Menu from "./components/menu.js";
import Filters from "./components/filter.js";
import Sort from "./components/sort.js";
import TripDays from "./components/days.js";
import TripDay from "./components/day.js";
import TripEvent from "./components/event.js";
import EventForm from "./components/form.js";
import {generateTrip} from "./mock/trip.js";

const render = (container, element, place = `beforeend`) => {
  container.insertAdjacentElement(place, element);
};

let trip = generateTrip();

const bodyElement = document.querySelector(`.page-body`);
const headerElement = bodyElement.querySelector(`.page-header`);

if (trip.length > 0) {
  const tripInfo = new TripInfo(trip);
  const tripInfoElement = headerElement.querySelector(`.trip-info`);
  render(tripInfoElement, tripInfo.getElement(), `afterbegin`);

  let tripCost = 0;
  for (let event of trip) {
    tripCost += event.price;
  }
  tripInfoElement.querySelector(`.trip-info__cost-value`).innerText = tripCost;
}

const menu = new Menu();
const tripControlsElement = headerElement.querySelector(`.trip-controls`);
const tripControlsMenuTitleElement = tripControlsElement.querySelector(`.visually-hidden`);
render(tripControlsMenuTitleElement, menu.getElement(), `afterend`);

const filters = new Filters();
const tripControlsFilterTitleElement = tripControlsElement.querySelector(`.visually-hidden:last-child`);
render(tripControlsFilterTitleElement, filters.getElement(), `afterend`);

const mainElement = bodyElement.querySelector(`.page-main`);

const sort = new Sort();
const form = new EventForm();
const tripDays = new TripDays();
const tripEventsElement = mainElement.querySelector(`.trip-events`);

if (trip.length === 0) {
  tripEventsElement.insertAdjacentHTML(`beforeend`, `<p class="trip-events__msg">Click New Event to create your first point</p>`);
} else {
  render(tripEventsElement, form.getElement());
  render(tripEventsElement, sort.getElement());
  render(tripEventsElement, tripDays.getElement());

  const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);
  let currentDate;
  let dayNumber = 0;
  for (let event of trip) {
    if (currentDate !== event.dateStart) {
      dayNumber++;
      const tripDay = new TripDay(dayNumber, event.dateStart);
      render(tripDaysElement, tripDay.getElement());
      currentDate = event.dateStart;
    }
    const tripDayEventsElement = tripDaysElement.querySelector(`.trip-days__item:nth-child(${dayNumber}) .trip-events__list`);
    const tripEvent = new TripEvent(event);
    const eventForm = new EventForm(event);

    const replaceFormToPoint = () => {
      tripDayEventsElement.replaceChild(tripEvent.getElement(), eventForm.getElement());
    };
    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;
      if (isEscKey) {
        replaceFormToPoint();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const eventButton = tripEvent.getElement().querySelector(`.event__rollup-btn`);
    eventButton.addEventListener(`click`, () => {
      tripDayEventsElement.replaceChild(eventForm.getElement(), tripEvent.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    const eventFormElement = eventForm.getElement();
    eventFormElement.addEventListener(`submit`, () => {
      replaceFormToPoint();
    });

    render(tripDayEventsElement, tripEvent.getElement());
  }
}
