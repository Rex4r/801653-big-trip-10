import {eventOffers} from "../const";

const eventType = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check in`, `Sightseeing`, `Restaurant`];
const eventName = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`];
const eventDescription = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];


const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const generateDescription = () => {
  let description = ``;
  let sentenceCount = getRandomIntegerNumber(1, 3);
  for (let i = 1; i <= sentenceCount; i++) {
    description += getRandomArrayItem(eventDescription);
  }

  return description;
};

const generateImgs = () => {
  let imgs = [];
  for (let i = 0; i <= 4; i++) {
    imgs.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }

  return imgs;
};

const generateEvent = (date) => {
  const dateStart = date;
  const randomDay = getRandomIntegerNumber(0, 1);
  const randomHour = getRandomIntegerNumber(0, 24);
  const randomMin = getRandomIntegerNumber(0, 60);
  const duration = (randomDay * 24 * 60 * 60 * 1000) + (randomHour * 60 * 60 * 1000) + (randomMin * 60 * 1000);
  const dateEnd = new Date(date.getTime() + duration);
  const offers = [];
  for (let i = 1; i <= getRandomIntegerNumber(0, 3); i++) {
    offers.push(eventOffers[i - 1]);
  }

  return {
    type: getRandomArrayItem(eventType),
    name: getRandomArrayItem(eventName),
    imgs: generateImgs(),
    dateStart,
    dateEnd,
    duration,
    offers,
    description: generateDescription(),
    price: getRandomIntegerNumber(0, 100),
  };
};

const generateTrip = () => {
  let trip = [];
  let date = new Date();
  const EVENTS_IN_TRIP = 4;
  for (let i = 1; i <= EVENTS_IN_TRIP; i++) {
    let eventDate = new Date(date.getTime() + getRandomIntegerNumber(0, 4) * 1000 * 60 * 60 * 24);
    trip.push(generateEvent(eventDate));
    date = eventDate;
  }

  return trip;
};

export {generateTrip};
