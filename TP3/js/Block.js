class Block {

  constructor(element) {
    this.block = element;
    this.width = this.block.clientWidth;
    this.height = this.block.clientHeight;
  }

  // Devuelve true si el personaje chocó con el bloque
  wasCrashed(character) {
    let characterTop = parseInt(window.getComputedStyle(character.element).getPropertyValue("top"));
    let blockLeft = parseInt(window.getComputedStyle(this.block).getPropertyValue("left"));
    // console.log('characterTop: ' + characterTop);
    // console.log('character.height - this.width: ' + (character.height - this.width))
    
    // console.log('blockLeft: ' + blockLeft);
    // console.log('character.width: ' + character.width);

    console.log(this.isHigher(character))

    // return ( blockLeft <  character.width
    //       && blockLeft >  - character.width
    //       && characterTop >= (character.height - character.width))
  }

  // Devuelve true si los pies del personaje están a una altura
  // mayor que el tope del bloque
  isHigher = (character) => {
    let characterTop = parseInt(window.getComputedStyle(character.element).getPropertyValue("top"));
    // let feetHeight = 600 - characterTop - character.height
    // console.log('feet: ' + feetHeight);
    let gapCharacterCanvas = 600 - (600 - character.height);
    console.log(gapCharacterCanvas)
    console.log('block bottom: ' + this.block.getBoundingClientRect().bottom);
    console.log('character bottom: ' + character.element.getBoundingClientRect().bottom)

    // return feetHeight > 600 - this.height
  }

 // a & b are HTMLElements
 overlaps(a, b) {
  const rect1 = a.getBoundingClientRect();
  const rect2 = b.getBoundingClientRect();
  const isInHoriztonalBounds =
    rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
  const isInVerticalBounds =
    rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
  const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
  return isOverlapping;
}



}