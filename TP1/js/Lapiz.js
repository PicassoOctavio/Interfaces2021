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