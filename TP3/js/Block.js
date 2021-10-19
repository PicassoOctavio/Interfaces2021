class Block {

  constructor(element) {
    this.block = element;
    this.width = 20;
  }

  // Devuelve true si el personaje chocó con el bloque
  wasCrashed(character) {
    let characterTop = parseInt(window.getComputedStyle(character.element).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(this.block).getPropertyValue("left"));
    return ( blockLeft <  this.width 
          && blockLeft > - this.width
          && characterTop >= (character.height - this.width))
  }

}