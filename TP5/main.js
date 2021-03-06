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

/* ------------------------ POST EN MURO ------------------------------ */
const btnSubirPosteo = document.querySelector(".post-button-js");
if (btnSubirPosteo) {
  btnSubirPosteo.addEventListener("click", subirPost)
}
function subirPost() {
  let mensaje = document.querySelector(".post-creator-message-js").value;
  if (mensaje){
    let muro = document.querySelector(".muro");

    let divPost = document.createElement('div');    
    let divPostUserAndDate = document.createElement('div');    
    let divInteractionButtons = document.createElement('div');    
    let nombreUser = document.createElement('h1');    
    let nombreDate = document.createElement('h2');    
    let textoMensaje = document.createElement('p');
    let imgAvatar = document.createElement('img');
    let imgLike = document.createElement('img');
    let imgComment = document.createElement('img');
    let imgShare = document.createElement('img');

    divPost.className = "post";
    divPostUserAndDate.className = "post-user-and-date";
    divInteractionButtons.className = "post-interaction-buttons";
    nombreUser.className = "username-post";
    nombreDate.className = "post-date";
    textoMensaje.className = "post-message";
    imgAvatar.className = "post-creator-user-icon";
    imgLike.className = "icon-like-post";
    imgComment.className = "icon-comment-post";
    imgShare.className = "icon-share-post";

    textoMensaje.innerHTML = mensaje;

    imgAvatar.src="img/userIcon.svg";
    nombreUser.innerHTML ="Javier De Marco";
    nombreDate.innerHTML = "3 de Diciembre 2021";
    imgLike.src="img/like-post-icon.svg";
    imgComment.src="img/comment-post-icon.svg";
    imgShare.src="img/share-post-icon.svg";

    divPostUserAndDate.appendChild(imgAvatar);
    divPostUserAndDate.appendChild(nombreUser);
    divPostUserAndDate.appendChild(nombreDate);
    divPost.appendChild(divPostUserAndDate);
    divPost.appendChild(textoMensaje);
    divInteractionButtons.appendChild(imgLike);
    divInteractionButtons.appendChild(imgComment);
    divInteractionButtons.appendChild(imgShare);
    divPost.appendChild(divInteractionButtons);
    muro.prepend(divPost);
    /* console.log(divPost); */
    document.querySelector(".post-creator-message-js").value = null;
  }
}


/* ------------------------ CHAT ------------------------------ */

const btnSendMessage = document.querySelector(".btnSendMessage-js");

if (btnSendMessage) {
  btnSendMessage.addEventListener("click", sendMessage);
}

function sendMessage(){
  let mensaje = document.querySelector(".post-send-message").value;
  if ( mensaje ){
    let columnMensaje = document.querySelector(".messages");
    let divMensaje = document.createElement('div');
    let textoMensaje = document.createElement('p');
    let imgAvatar = document.createElement('img');
  
    imgAvatar.className = "post-chat-user-icon-sended";
    imgAvatar.src = "img/userIcon.svg";
    divMensaje.className = "message-sended";
    textoMensaje.className = "post-message-sended-chat";
    
    console.log(imgAvatar);
    textoMensaje.innerHTML = mensaje;
    divMensaje.appendChild(textoMensaje);
    divMensaje.appendChild(imgAvatar);
    columnMensaje.appendChild(divMensaje);
  
    document.querySelector(".post-send-message").value = null;
    document.querySelector(".post-send-message").focus();
  }
}

function loadImage() {

}

/* 
listenButtonUpload(button) {
    button.addEventListener('click', async () => {
      let inputFile = document.querySelector('.js-input-file');
      inputFile.click();
      let image = await this.getImage(inputFile);
      inputFile.value = '';
      this.canvas.whiten();
      this.canvas.drawImage(image);
      this.uncheckFilters();
    })
  }
*/

/* 
  getImage(inputFile) {
    return new Promise((resolve, reject) => {
      inputFile.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
          let content = readerEvent.target.result;
          let image = new Image();
          image.src = content;
          image.onload = () => { resolve (image); }
        }
      }
    })
  }
*/


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

// CAMBIOS DE RUTA

document.addEventListener('DOMContentLoaded', () => {
  // setInterval(() => {
  //   mostrarApp()
  // }, 1000);

  setTimeout( function() { 
    mostrarApp();
  },
  1000);

})

function mostrarApp() {
  const content = document.querySelector('.js-content-app');
  const loaderPage = document.querySelector('.js-loader-page');
  const ads = document.querySelector('.js-publicidades');
  const contactos = document.querySelector('.js-contactos')

  if (ads) {
    ads.classList.remove('js-display-none')
  }
  content.classList.remove('js-display-none');

  if (contactos) {
    contactos.classList.remove('js-display-none');
  }
  loaderPage.classList.add('js-display-none');
  
}
 
