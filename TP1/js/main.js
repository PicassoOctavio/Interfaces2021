function init() {
  
  const btnFilter = document.querySelector('.js-filter-button');
  const filterPopUp = document.querySelector('.js-filters-pop-up');
  const btnPencil = document.querySelector('.js-pencil');
  const sliderPencilPopUp = document.querySelector('.js-slider-pencil-pop-up');
  const btnEraser = document.querySelector('.js-eraser');
  const sliderEraserPopUp = document.querySelector('.js-slider-eraser-pop-up');
  
  btnFilter.addEventListener('click', () => showFilters( filterPopUp ));
  btnPencil.addEventListener("click", () => showFilters( sliderPencilPopUp ));
  btnEraser.addEventListener('click', () => showFilters( sliderEraserPopUp ));

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
  const filtroEscalaGrises = new FiltroEscalaGrises();
  const filtroDeteccionBordes = new FiltroDeteccionBordes(document.querySelector('.js-filter-edge-detection'));

  paint.listenButtonUpload(buttonUpload);
  paint.listenTool(lapiz);
  paint.listenTool(goma);
  paint.listenFilter(filtroNegativo);
  paint.listenFilter(filtroSepia);
  paint.listenFilter( filtroBinarizacion );
  paint.listenFilter( filtroSaturacion );
  paint.listenFilter( filtroBrillo );
  paint.listenFilter(filtroBlur);
  paint.listenFilter(filtroEscalaGrises);
  paint.listenFilter(filtroDeteccionBordes);
}

function showFilters(popUp) {
  console.log( "popUp", popUp );
  popUp.classList.toggle('display-none');
}


init();