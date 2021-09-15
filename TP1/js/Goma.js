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
    this.slider = document.querySelector('.js-slider-eraser');
    this.slider.addEventListener("input", () => {
      this.size = this.slider.value;
    })
  }

  unselect() {
    this.is_selected = false;
  }

  listenClick() {
    this.boton.addEventListener('click', () => {
      this.is_selected = true;
      let lapizSlider = document.querySelector('.js-slider-pencil');
      lapizSlider.parentNode.classList.add('display-none');
      this.slider.parentNode.classList.toggle('display-none');
      let colorPicker = document.querySelector('.js-color-picker');
      colorPicker.classList.add('visibility-hidden');

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