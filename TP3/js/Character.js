class Character {

  constructor(element) {
    this.element =  element;
    this.height  =  this.element.clientHeight;
    this.width   =  this.element.clientWidth;
  }

  /* Si el div no tiene la clase 'js-jump' se la agrega. Una vez
  terminada la animación, se quita la clase del elemento */
  jump = () => {
    if ( ! this.element.classList.contains('js-jump')) {
      this.element.classList.add("js-jump");
      this.element.addEventListener('animationend', () => {
        this.element.classList.remove("js-jump");
      })
    }
  }

}