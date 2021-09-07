"use strict"
document.addEventListener("DOMContentLoaded", function() {

  let canvas = document.querySelector('.canvas1');
  let input = document.querySelector('.input1')
  let context = canvas.getContext('2d');
  let imageData = context.createImageData( canvas.width, canvas.height );
  
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


});