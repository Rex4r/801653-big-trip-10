import {createTripInfoTemplate, createMenuTemplate, createFilterTemplate} from "./components/header.js";
import {createSortTemplate} from "./components/sort.js";
import {createAddFormTemplate, createFormTemplate, createTripsDaysTemplate, createTripsDayTemplate, createTripsEventTemplate} from "./components/days.js";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const bodyElement = document.querySelector(`.page-body`);
const headerElement = bodyElement.querySelector(`.page-header`);

const tripInfoElement = headerElement.querySelector(`.trip-info`);
render(tripInfoElement, createTripInfoTemplate(), `afterbegin`);

const tripControlsElement = headerElement.querySelector(`.trip-controls`);
const tripControlsMenuTitleElement = tripControlsElement.querySelector(`.visually-hidden`);
render(tripControlsMenuTitleElement, createMenuTemplate(), `afterend`);

const tripControlsFilterTitleElement = tripControlsElement.querySelector(`.visually-hidden:last-child`);
render(tripControlsFilterTitleElement, createFilterTemplate(), `afterend`);

const mainElement = bodyElement.querySelector(`.page-main`);

const tripEventsElement = mainElement.querySelector(`.trip-events`);
render(tripEventsElement, createSortTemplate());
render(tripEventsElement, createAddFormTemplate());
render(tripEventsElement, createTripsDaysTemplate());

const tripDaysElement = tripEventsElement.querySelector(`.trip-days`);
render(tripDaysElement, createTripsDayTemplate());

const tripDayEventsElement = tripEventsElement.querySelector(`.trip-events__list`);
render(tripDayEventsElement, createFormTemplate());
for (let i = 1; i <= 3; i++) {
  render(tripDayEventsElement, createTripsEventTemplate());
}
