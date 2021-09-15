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
    this.slider = document.querySelector('.js-slider-pencil');
    this.slider.addEventListener("input", () => {
      this.size = this.slider.value;
    })
  }

<<<<<<< HEAD
=======
  // actualiza el tamaño del pincel segun el valor del input type="range"
  slider( sliderValue ){
    this.size = sliderValue.value;
  }

>>>>>>> d2bef8948888944a4d13852f219610eaa0d726f7
  unselect() {
    this.is_selected = false;
  }

  listenClick() {
    this.boton.addEventListener('click', () => {
      this.is_selected = true;
      let gomaSlider = document.querySelector('.js-slider-eraser');
      gomaSlider.parentNode.classList.add('display-none');
      this.slider.parentNode.classList.toggle('display-none');
      this.color.classList.toggle('visibility-hidden');
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