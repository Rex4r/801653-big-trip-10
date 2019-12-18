import {createTripsEventTemplate} from "./event.js";

const createTripsDayTemplate = (dayNumber, eventDate) => {
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
        <span class="day__counter">${dayNumber}</span>
        <time class="day__date" datetime="${toYYYYMMDDFormat(eventDate)}">${toMMMDDFormat(eventDate)}</time>
      </div>
    
      <ul class="trip-events__list"></ul>
    </li>`
  );
};

export {createTripsDayTemplate, createTripsEventTemplate};
