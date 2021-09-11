function init() {

  const btnFilter = document.querySelector( '.js-filter-button' );
  const filterPopUp = document.querySelector( '.js-filters-pop-up' );
  const pencilToolsPopUp = document.querySelector( '.js-pencil-tools-pop-up' );

  
  filterPopUp.addEventListener('click', () => console.log('clicked'))
  btnFilter.addEventListener('click', () => showFilters(filterPopUp));
  // btnFilter.addEventListener('focusout', () => showFilters(filterPopUp));

  const paint = new Paint();
  const lapiz = new Lapiz( 2, document.querySelector('.js-pencil') );
  const goma  = new Goma( 2, document.querySelector( '.js-eraser' ), '#FFFFFF' );

  const buttonUpload = document.querySelector('.js-button-upload');
  const filtroNegativo = new FiltroNegativo(document.querySelector('.js-filter-negativo'));
  const filtroSepia = new FiltroSepia(document.querySelector('.js-filter-sepia'));

  paint.listenButtonUpload(buttonUpload);
  paint.listenTool(lapiz);
  paint.listenTool(goma);
  paint.listenFilter(filtroNegativo);
  paint.listenFilter(filtroSepia);
}

function showFilters(popUp) {
  popUp.classList.toggle('display-none');
}


init();