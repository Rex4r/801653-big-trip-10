import {createAddFormTemplate, createFormTemplate} from "./form.js";
import {createTripsDayTemplate, createTripsEventTemplate} from "./day.js";

const createTripsDaysTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export {createAddFormTemplate, createFormTemplate, createTripsDaysTemplate, createTripsDayTemplate, createTripsEventTemplate};
