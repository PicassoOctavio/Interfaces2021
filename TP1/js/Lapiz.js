class Lapiz {

  size;
  color;
  boton;
  is_selected;

  constructor(size, boton) {
    this.size = size;
    this.color = document.querySelector('.js-color-picker');
    this.boton = boton;
    this.is_selected = false;
    this.listenClick();

    let sliderValue = document.querySelector('.js-slider-pencil');
    sliderValue.addEventListener("input", (e) => {
      this.slider( sliderValue );
    })
  }

  // actualiza el tamaño del pincel segun el valor del input type="range"
  slider( sliderValue ){
    this.size = sliderValue.value;
  }

  unselect() {
    this.is_selected = false;
  }

  listenClick() {
    this.boton.addEventListener('click', () => {
      console.log('CLICKEASTE LAPIZ')
      this.is_selected = true;
    })
  }

  getColor() {
    return this.color.value;
  }

  getSize() {
    console.log("sizee", this.size );
    return this.size;
  }

  isSelected() {
    return this.is_selected;
  }

}