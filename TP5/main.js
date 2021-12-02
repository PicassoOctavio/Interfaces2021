window.onscroll = function() {myFunction()};

var header = document.querySelector('header');
var sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
// EXPLICAR BIEN QUÉ HACE LO DE ARRIBA (cambiar nombre a las funciones y variables)

const inputBuscador = document.querySelector('.js-input-buscador');
const btnCloseBusquedasRecientes = document.querySelector('.js-btn-cerrar-busquedas');
const btnFiltrosBusqueda = document.querySelector('.js-btn-filtros-busqueda');
const btnLimpiarFiltros = document.querySelector('.js-btn-limpiar-filtros');
const filtros = document.querySelectorAll('.js-filtro');
const btnLimpiarBuscador = document.querySelector('.js-btn-limpiar-buscador');

if (btnLimpiarBuscador) {
  btnLimpiarBuscador.addEventListener('click', () => {
    inputBuscador.value = '';
    ocultarBotonLimpiarBuscador();
    ocultarResultado();
    inputBuscador.focus();
  })
}


if (filtros) {
  filtros.forEach(filtro => {
    filtro.addEventListener('click', () => {
      if (filtro.checked == true) {
        updateBadge(+1);
      } else {
        updateBadge(-1);
      }
    })
  });
}

if (btnFiltrosBusqueda) {
  btnFiltrosBusqueda.addEventListener('click', () => {
    mostrarFiltrosDeBusqueda();
    ocultarBusquedasRecientes();
  })
}

if (btnLimpiarFiltros) {
  btnLimpiarFiltros.addEventListener('click', () => {
    limpiarFiltros(filtros);
  })
}

if (inputBuscador) {
  inputBuscador.addEventListener('focus', () => {
    if ( ! inputBuscador.value) {
      mostrarBusquedasRecientes();
      ocultarResultado();
    } else {
      mostrarBotonLimpiarBuscador();
    }
    ocultarFiltrosDeBusqueda();
  })
  
  inputBuscador.addEventListener('keyup', () => {
    if (inputBuscador.value != '') {
      mostrarBotonLimpiarBuscador();
      ocultarBusquedasRecientes();
      mostrarBuscando();
      ocultarResultado();
      let interval = setInterval(() => {
        ocultarBuscando();
        if (inputBuscador.value != '') {
          mostrarResultado(inputBuscador.value);
        }
      }, 1000);
      setInterval(() => {
        clearInterval(interval)
      }, 1000);
    } else {
      ocultarResultado();
      ocultarBotonLimpiarBuscador();
      mostrarBusquedasRecientes();
    }
  
    console.log(inputBuscador.value)
  })

}


if (btnCloseBusquedasRecientes) {
  btnCloseBusquedasRecientes.addEventListener('click', ocultarBusquedasRecientes)
}

function mostrarBotonLimpiarBuscador() {
  btnLimpiarBuscador.classList.remove('js-display-none');
}

function ocultarBotonLimpiarBuscador() {
  btnLimpiarBuscador.classList.add('js-display-none')
}


function ocultarResultado() {
  const resultados = document.querySelector('.js-resultados-busqueda')
  // const h1 = document.querySelector('.js-titulo-resultados');
  
  resultados.classList.add('js-display-none');
  // h1.innerHTML = res;
}

function mostrarBuscando() {
  const buscando = document.querySelector('.js-buscando');
  buscando.classList.remove('js-display-none');
}

function ocultarBuscando() {
  const buscando = document.querySelector('.js-buscando');
  buscando.classList.add('js-display-none');
}

function mostrarResultado(res) {
  const resultados = document.querySelector('.js-resultados-busqueda')
  const h1 = document.querySelector('.js-titulo-resultados');
  
  resultados.classList.remove('js-display-none');
  h1.innerHTML = res;
}

function updateBadge(nro) {
  console.log(nro)
  const spanDelBadge = document.querySelector('.js-span-badge');
  let nroDelBadge = parseInt(spanDelBadge.innerHTML);
  spanDelBadge.innerHTML = nroDelBadge + nro;
}

function limpiarFiltros(filtros) {
  filtros.forEach(filtro => {
    filtro.checked = false;
  });
  const spanDelBadge = document.querySelector('.js-span-badge');
  spanDelBadge.innerHTML = 0;
}

function mostrarFiltrosDeBusqueda() {
  const filtrosBusqueda = document.querySelector('.js-filtros-busqueda');
  filtrosBusqueda.classList.toggle('js-display-none');
}

function ocultarFiltrosDeBusqueda() {
  const filtrosBusqueda = document.querySelector('.js-filtros-busqueda');
  filtrosBusqueda.classList.add('js-display-none');
}


function mostrarBusquedasRecientes() {
  const divBusquedasRecientes = document.querySelector('.js-busquedas-recientes');
  divBusquedasRecientes.classList.remove('js-display-none');
}

function ocultarBusquedasRecientes() {
  const divBusquedasRecientes = document.querySelector('.js-busquedas-recientes');
  divBusquedasRecientes.classList.add('js-display-none');
}