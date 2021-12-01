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

if (inputBuscador) {
  inputBuscador.addEventListener('focus', () => {
    mostrarBusquedasRecientes();
  })
  
  inputBuscador.addEventListener('keyup', () => {
    if (inputBuscador.value != '') {
      ocultarBusquedasRecientes();
    } else {
      mostrarBusquedasRecientes();
    }
  
    console.log(inputBuscador.value)
  })
}

if (btnCloseBusquedasRecientes) {
  btnCloseBusquedasRecientes.addEventListener('click', ocultarBusquedasRecientes)
}



function mostrarBusquedasRecientes() {
  const divBusquedasRecientes = document.querySelector('.js-busquedas-recientes');
  divBusquedasRecientes.classList.remove('js-display-none');
}

function ocultarBusquedasRecientes() {
  const divBusquedasRecientes = document.querySelector('.js-busquedas-recientes');
  divBusquedasRecientes.classList.add('js-display-none');
}