const createTripInfoTemplate = (events) => {
  const createCitiesString = () => {
    const cities = events.map((event) => {
      return event.name;
    });

    return cities.join(` &mdash; `);
  };

  const createDateString = (dateStart, dateEnd) => {
    return (
      `${dateStart.getMonth()} ${dateStart.getDate()}&nbsp;&mdash;&nbsp;${dateStart.getMonth() !== dateEnd.getMonth() ? dateEnd.getMonth() : ``} ${dateEnd.getDate()}`
    );
  };

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${createCitiesString()}</h1>

      <p class="trip-info__dates">${createDateString(events[0].dateStart, events[events.length - 1].dateEnd)}</p>
    </div>
    `
  );
};

export {createTripInfoTemplate};
