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

const btnSendMessage = document.querySelector(".btnSendMessage-js");
btnSendMessage.addEventListener("click", sendMessage)


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


