import {createTripInfoTemplate, createMenuTemplate, createFiltersTemplate} from "./components/header.js";
import {createSortTemplate} from "./components/sort.js";
import {createAddFormTemplate, createFormTemplate, createTripsDaysTemplate, createTripsDayTemplate, createTripsEventTemplate} from "./components/days.js";
import {generateTrip} from "./mock/trip.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

let trip = generateTrip();

const bodyElement = document.querySelector(`.page-body`);
const headerElement = bodyElement.querySelector(`.page-header`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
render(tripInfoElement, createTripInfoTemplate(trip), `afterbegin`);

let tripCost = 0;
for (let event of trip) {
  tripCost += event.price;
}
tripInfoElement.querySelector(`.trip-info__cost-value`).innerText = tripCost;

const tripControlsElement = headerElement.querySelector(`.trip-controls`);
const tripControlsMenuTitleElement = tripControlsElement.querySelector(`.visually-hidden`);
render(tripControlsMenuTitleElement, createMenuTemplate(), `afterend`);

const tripControlsFilterTitleElement = tripControlsElement.querySelector(`.visually-hidden:last-child`);
render(tripControlsFilterTitleElement, createFiltersTemplate(), `afterend`);

const mainElement = bodyElement.querySelector(`.page-main`);

const tripEventsElement = mainElement.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createAddFormTemplate());
render(tripEventsElement, createTripsDaysTemplate());

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);
let currentDate;
let currentEvent = 0;
let dayNumber = 0;
for (let event of trip) {
  if (currentDate !== event.dateStart) {
    dayNumber++;
    render(tripDaysElement, createTripsDayTemplate(dayNumber, event.dateStart));
    currentDate = event.dateStart;
  }
  if (currentEvent === 0) {
    const tripDayEventsElement = tripEventsElement.querySelector(`.trip-events__list`);
    render(tripDayEventsElement, createFormTemplate(event));
  } else {
    const tripDayEventsElement = tripDaysElement.querySelector(`.trip-days__item:nth-child(${dayNumber}) .trip-events__list`);
    render(tripDayEventsElement, createTripsEventTemplate(event));
  }
  currentEvent++;
}
