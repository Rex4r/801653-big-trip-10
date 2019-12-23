const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const castTimeFormat = (value) => {
  return String(value).padStart(2, `0`);
};

export {createElement, castTimeFormat};
