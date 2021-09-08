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