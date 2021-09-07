class Lapiz {

  dotSize;
  color;
  lapiz;
  isclicked;

  constructor(dotSize) {
    this.dotSize = dotSize;
    this.color = document.querySelector('.js-color-picker');
    this.lapiz = document.querySelector('.js-pencil');
    this.lapiz.addEventListener('click', () => {
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