function init() {
  const btnFilter = document.querySelector('.js-filter-button');
  const filterPopUp = document.querySelector('.js-filters-pop-up');
  
  filterPopUp.addEventListener('click', () => console.log('clicked'))
  btnFilter.addEventListener('click', () => showFilters(filterPopUp));
  btnFilter.addEventListener('focusout', () => showFilters(filterPopUp));

  const paint = new Paint();
  const lapiz = new Lapiz(2);
  paint.addTool(lapiz);
}

function showFilters(popUp) {
  popUp.classList.toggle('display-none');
}


init();