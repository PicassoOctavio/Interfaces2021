function init() {
  const btnFilter = document.querySelector('.js-filter-button');
  const filterPopUp = document.querySelector('.js-filters-pop-up');
  
  filterPopUp.addEventListener('click', () => console.log('clicked'))
  btnFilter.addEventListener('click', () => showFilters(filterPopUp));
  btnFilter.addEventListener('focusout', () => showFilters(filterPopUp));

  const paint = new Paint();
  const lapiz = new Lapiz(2, document.querySelector('.js-pencil'));
  const goma  = new Goma(2, document.querySelector('.js-eraser'), '#FFFFFF');
  paint.addTool(lapiz);
  paint.addTool(goma);
}

function showFilters(popUp) {
  popUp.classList.toggle('display-none');
}


init();