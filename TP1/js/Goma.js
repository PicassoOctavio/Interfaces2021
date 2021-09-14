class Goma {

  size;
  color;
  boton;
  is_selected;

  constructor(size, boton, color) {
    this.size = size;
    this.color = color;
    this.boton = boton;
    this.is_selected = false;
    this.listenClick();

    let sliderEraser = document.querySelector('.js-slider-eraser');
    sliderEraser.addEventListener("input", (e) => {
      this.slider( sliderEraser );
    })
  }

  // actualiza el tamaño del pincel segun el valor del input type="range"
  slider( sliderEraser ){
    //console.log("sliderEraser ", sliderEraser.value );
    this.size = sliderEraser.value;
  }

  unselect() {
    this.is_selected = false;
  }

  listenClick() {
    this.boton.addEventListener('click', () => {
      console.log('CLICKEASTE goma')
      this.is_selected = true;
    })
  }

  getColor() {
    return this.color;
  }

  getSize() {
    return this.size;
  }

  isSelected() {
    return this.is_selected;
  }

}