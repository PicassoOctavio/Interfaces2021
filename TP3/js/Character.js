class Character {

  constructor(element) {
    this.character = element;
  }

  /* Si el div no tiene la clase 'js-jump' se la agrega. Una vez
  terminada la animación, se quita la clase del elemento */
  jump() {
    if ( ! this.character.classList.contains('js-jump')) {
      this.character.classList.add("js-jump");
      this.character.addEventListener('animationend', () => {
        this.character.classList.remove("js-jump");
      })
    }
  }

}