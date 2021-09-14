function init() {
  
  const btnFilter = document.querySelector('.js-filter-button');
  const filterPopUp = document.querySelector('.js-filters-pop-up');
  
  btnFilter.addEventListener('click', () => showFilters(filterPopUp));

  const paint = new Paint();
  const lapiz = new Lapiz(2, document.querySelector('.js-pencil'));
  const goma  = new Goma(2, document.querySelector('.js-eraser'), '#FFFFFF');
  const buttonUpload = document.querySelector('.js-button-upload');
  const filtroNegativo = new FiltroNegativo(document.querySelector('.js-filter-negativo'));
  const filtroSepia = new FiltroSepia(document.querySelector('.js-filter-sepia'));
  const filtroBinarizacion = new FiltroBinarizacion( document.querySelector( '.js-filter-binarizacion' ));
  const filtroSaturacion = new FiltroSaturacion( document.querySelector( '.js-filter-saturacion' ));
  const filtroBrillo = new FiltroBrillo( document.querySelector('.js-filter-brightness') );
  const filtroBlur = new FiltroBlur(document.querySelector('.js-filter-blur'));

  paint.listenButtonUpload(buttonUpload);
  paint.listenTool(lapiz);
  paint.listenTool(goma);
  paint.listenFilter(filtroNegativo);
  paint.listenFilter(filtroSepia);
  paint.listenFilter( filtroBinarizacion );
  paint.listenFilter( filtroSaturacion );
  paint.listenFilter( filtroBrillo );
  paint.listenFilter(filtroBlur);
}

function showFilters(popUp) {
  popUp.classList.toggle('display-none');
}


init();