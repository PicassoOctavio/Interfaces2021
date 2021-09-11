class Lapiz {

  size;
  color;
  boton;
  is_selected;

  constructor( size, boton ) {
    this.size = size;
    this.color = document.querySelector('.js-color-picker');
    this.boton = boton;
    this.is_selected = false;
    this.listenClick();
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
    return this.size;
  }

  isSelected() {
    return this.is_selected;
  }

}