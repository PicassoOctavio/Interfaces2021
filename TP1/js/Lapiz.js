class Lapiz {

  dotSize;
  color;
  lapiz;
  isClicked;

  constructor(dotSize) {
    let colorPicker = document.querySelector('.js-color-picker');
    this.dotSize = dotSize;
    this.color = colorPicker.value;
    this.lapiz = document.querySelector('.js-pencil');
    this.lapiz.addEventListener('click', () => {
      console.log('CLICKEASTE LAPIZ')
      this.isClicked = true;
    })
  }

  getColor() {
    return this.color;
  }

  getDotSize() {
    return this.dotSize;
  }

  isClicked() {
    return this.isClicked;
  }

}