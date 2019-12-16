const filterNames = [
  `everything`, `future`, `past`
];

const createFiltersTemplate = () => {
  let filterTemplate = ``;

  for (let [index, name] of filterNames.entries()) {
    filterTemplate += `<div class="trip-filters__filter">
        <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${ index === 0 ? `checked` : ``}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
      </div>`;
  }

  return (
    `<form class="trip-filters" action="#" method="get">
    
      ${filterTemplate}
    
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export {createFiltersTemplate};
