const createTripInfoTemplate = (events) => {
  const craeteCitiesString = () => {
    let citiesString = ``;
    for (let [index, event] of events.entries()) {
      citiesString += `${index > 0 ? ` &mdash; ` : ``}${event.name}`;
    }

    return citiesString;
  };

  const createDateString = (dateStart, dateEnd) => {
    return (
      `${dateStart.getMonth()} ${dateStart.getDate()}&nbsp;&mdash;&nbsp;${dateStart.getMonth() !== dateEnd.getMonth() ? dateEnd.getMonth() : ``} ${dateEnd.getDate()}`
    );
  };

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${craeteCitiesString()}</h1>

      <p class="trip-info__dates">${createDateString(events[0].dateStart, events[events.length - 1].dateEnd)}</p>
    </div>
    `
  );
};

export {createTripInfoTemplate};
