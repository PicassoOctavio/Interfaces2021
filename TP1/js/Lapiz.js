class Lapiz {

  dotSize;
  color;
  boton;
  isclicked;

  constructor(dotSize) {
    this.dotSize = dotSize;
    this.color = document.querySelector('.js-color-picker');
    this.boton = document.querySelector('.js-pencil');
    this.listenClick();
  }

  listenClick() {
    this.boton.addEventListener('click', () => {
      console.log('CLICKEASTE LAPIZ')
      this.isclicked = true;
    })
  }

  getColor() {
    return this.color.value;
  }

  getDotSize() {
    return this.dotSize;
  }

  isClicked() {
    return this.isclicked;
  }

}