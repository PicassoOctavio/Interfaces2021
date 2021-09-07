"use strict"
document.addEventListener("DOMContentLoaded", function() {

  let canvas = document.querySelector('.canvas1');
  let input = document.querySelector('.input1')
  let context = canvas.getContext('2d');
  let imageData = context.createImageData( canvas.width, canvas.height );
  let color;
  
  //--------------------- pedro -----------------------------------------------

  function init() {
    const btnFilter = document.querySelector('.js-filter-button');
    const filterPopUp = document.querySelector('.js-filters-pop-up');
    
    filterPopUp.addEventListener('click', () => console.log('clicked'))
    btnFilter.addEventListener('click', () => showFilters(filterPopUp));
    btnFilter.addEventListener('focusout', () => showFilters(filterPopUp));
  }
  
  function showFilters(popUp) {
    popUp.classList.toggle('display-none');
  }
  
  init();
  //--------------------------------------------------------------------

  //Cargando imagen de fondo local al iniciar
  let image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src = 'fondoInicio.jpg';
  image.onload = function () {
      context.fillStyle = "#F0F0EC"; // canvas background color
      const imageAspectRatio = (1.0 * this.height) / this.width;
      const imageScaledWidth = canvas.width;
      const imageScaledHeight = canvas.width * imageAspectRatio;
      context.fillRect(0, 0, canvas.width, canvas.height);
      // draw image on canvas
      context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
      // get imageData from content of canvas
      const imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
      // draw the modified image
      context.putImageData(imageData, 0, 0);
  }

  //--------------------------------------------------------------------

  //Cargar imagen adaptable
  input.onchange = e => {
    // getting a hold of the file reference
    let file = e.target.files[0];
    // setting up the reader
    let reader = new FileReader();
    reader.readAsDataURL( file ); // this is reading as data url
    reader.onload = readerEvent => {// here we tell the reader what to do when it's done reading...
        let content = readerEvent.target.result; // this is the content!
        let image = new Image();
        image.src = content;
        image.onload = function () {
            let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio;
            context.canvas.width = imageScaledWidth;
            context.canvas.height = imageScaledHeight;
            context.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
            let imageData = context.getImageData(0, 0, imageScaledWidth, imageScaledHeight);// get imageData from content of canvas
            context.putImageData(imageData, 0, 0);
        }
    }
  }
  
  //--------------------------------------------------------------------
  //SLIDER PINCEL
  let tamanioPincel = document.querySelector("#tamanioPincel");
  let sliderValor = document.querySelector("#slider");
  tamanioPincel.addEventListener("input", slider);

  //------------------------------------------------------------------
  // toma el valor del input (type = range) para darle el tamaño al pincel/borrador
  function slider(){ 
      // el span se vuelve el valor del input "tamanioPincel"
      sliderValor.innerHTML = tamanioPincel.value;
      return tamanioPincel.value;
  };

  //--------------------------------------------------------------------
  let lapiz = document.querySelector('#lapiz');
  lapiz.addEventListener('click', accionDibujo);

  function accionDibujo() { // DIBUJO/BORRAR
    
    console.log("entro");

    let prevX = 0;
    let currX = 0;
    let prevY = 0;
    let currY = 0;
    let dibujar = false;
    let flag = false;        
    color = "#000000";

    canvas.addEventListener("mousemove", function (e) {
        encontrarXy('move', e, color)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        encontrarXy('down', e, color)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        encontrarXy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        encontrarXy('out', e)
    }, false);

    //------------------------------------------------------------------------
    function encontrarXy(res, e, color) {
        console.log( "res" , res, "| e", e, " | color", color );

        if ( res == 'down' ) {
            prevX = currX;
            prevY = currY;
            currX = e.pageX - canvas.offsetLeft;
            currY = e.pageY - canvas.offsetTop;
            flag = true;
            dibujar = true;

            if ( dibujar ) {
                context.beginPath();
                context.arc(currX, currY, 7.5, Math.PI*2, false);
                context.lineWidth = slider();
                context.strokeStyle = color;
                context.stroke();
                context.closePath();
            }
        }

        if ( res == 'up' || res == "out" ) {
            flag = false;
        }

        if ( res == 'move' ) {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.pageX - canvas.offsetLeft;
                currY = e.pageY - canvas.offsetTop;
                draw(color);
            }
        }
    }
    //------------------------------------------------------------------------
    function draw( color ) {       
        context.beginPath();
        context.arc(currX, currY, 7.5, Math.PI*2, false);
        context.lineWidth = slider();
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    }
  }//FIN FUNCION DIBUJO/BORRAR


});