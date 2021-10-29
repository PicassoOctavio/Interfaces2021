class Character {

  constructor(element) {
    this.element =  element;
    this.body = element.querySelector('.js-character-body');
    this.height  =  this.element.clientHeight;
    this.width   =  this.element.clientWidth;
    this.isDead = false;
    this.isJumping = false;
    this.listenJump();
    this.listenSlide();
  }

  /* Si el div no tiene la clase 'js-jump' se la agrega. Una vez
  terminada la animación, se quita la clase del elemento */
  jump = () => {
    if ( ! this.element.classList.contains('js-jump')) {
      this.element.classList.add("js-jump");
      this.isJumping = true;
      this.element.addEventListener('animationend', () => {
        this.element.classList.remove("js-jump");
        this.isJumping = false;
      })
    }
  }

  // Cuando se presiona la tecla 'flecha arriba' le digo al personaje que salte
  listenJump = () => document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp')
      this.jump()    
  });

  slide = () => {
    if ( ! this.element.classList.contains('js-slide')  && ! this.isJumping ) {
      this.element.classList.add("js-slide");
      this.body.classList.add('js-height-50px');
      this.element.addEventListener('animationend', () => {
        this.element.classList.remove("js-slide");
        this.body.classList.remove('js-height-50px');
      })
    }
  }

  listenSlide = () => document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowDown')
      this.slide()    
  });

  die = () => {
    this.isDead = true;
    this.element.classList.add('js-die');
    this.element.classList.remove('js-walking-animation');
  }

}