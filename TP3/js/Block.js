class Block {

  constructor(element) {
    this.block = element;
    this.width = this.block.clientWidth;
  }

  // Devuelve true si el personaje chocó con el bloque
  wasCrashed(character) {
    let characterTop = parseInt(window.getComputedStyle(character.element).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(this.block).getPropertyValue("left"));
    return ( blockLeft <  character.width 
          && blockLeft >  0
          && characterTop >= (character.height - this.width))
  }

}