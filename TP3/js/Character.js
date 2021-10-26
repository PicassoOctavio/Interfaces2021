class Character {

  constructor(element) {
    this.element =  element;
    this.body = element.querySelector('.js-character-body');
    this.height  =  this.element.clientHeight;
    this.width   =  this.element.clientWidth;
    this.listenJump();
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

  // Cuando se presiona la tecla 'flecha arriba' le digo al personaje que salte
  listenJump = () => document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp')
      this.jump()    
  });

}