import TripInfo from "./components/trip-info.js";
import Menu from "./components/menu.js";
import Filters from "./components/filter.js";
import {generateTrip} from "./mock/trip.js";
import {render} from "./utils/render.js";
import TripController from "./controllers/trip";

let trip = generateTrip();

const bodyElement = document.querySelector(`.page-body`);
const headerElement = bodyElement.querySelector(`.page-header`);

if (trip.length > 0) {
  const tripInfo = new TripInfo(trip);
  const tripInfoElement = headerElement.querySelector(`.trip-info`);
  render(tripInfoElement, tripInfo, `afterbegin`);

  let tripCost = 0;
  for (let event of trip) {
    tripCost += event.price;
  }
  tripInfoElement.querySelector(`.trip-info__cost-value`).innerText = tripCost;
}

const menu = new Menu();
const tripControlsElement = headerElement.querySelector(`.trip-controls`);
const tripControlsMenuTitleElement = tripControlsElement.querySelector(`.visually-hidden`);
render(tripControlsMenuTitleElement, menu, `afterend`);

const filters = new Filters();
const tripControlsFilterTitleElement = tripControlsElement.querySelector(`.visually-hidden:last-child`);
render(tripControlsFilterTitleElement, filters, `afterend`);

const tripEventsElement = bodyElement.querySelector(`.trip-events`);
const tripController = new TripController(tripEventsElement);

tripController.render(trip);
