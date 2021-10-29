class Coin {

  constructor(div) {
    this.div = div;
    this.body = div.querySelector('.js-coin-body');
  }

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

  isTouched = (character) => {
    return this.overlaps(this.body, character.body)
  }

  animate = () => {
    this.div.classList.add("js-coin-collected");
    const audio = new Audio('sounds/addCoin.wav');
    audio.play();
    this.div.addEventListener('animationend', () => {
      this.div.classList.remove("js-coin-collected");
    })

  }

}