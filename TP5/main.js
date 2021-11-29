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


/* ------------------------ CHAT ------------------------------ */

function sendMessage(){
  const mensaje = document.querySelector(".post-send-message").value;
  let columnMensaje = document.querySelector("messages");
  let divMensaje = document.createElement('div');
  const textoMensaje = document.createElement('p');

  divMensaje.className = "message-sended";
  textoMensaje.className = "post-message-sended-chat";
  divMensaje.appendChild(textoMensaje);
  columnMensaje.appendChild(columnMensaje);
  
}


