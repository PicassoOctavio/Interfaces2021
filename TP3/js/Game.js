class Game {

  constructor(maxScore) {
    this.scoreDiv = document.querySelector('.js-score');
    this.score = 0;
    this.maxScoreDiv = document.querySelector('.js-max-score');
    this.maxScore = maxScore;
    this.character;
    this.rock;
    this.bee;
    this.coin;
    this.drawMaxScore();
    // this.checkDead();
    // this.checkCoin();
  }

  drawMaxScore = () => {
    this.maxScoreDiv.innerHTML = this.maxScore;
  }

  setCharacter = (character) => this.character = character;

  setRock = (rock) => this.rock = rock;

  setCoin = (coin) => this.coin = coin;

  setBee = (bee) => this.bee = bee;

  // Checkea cada 10 milisegundos si el personaje chocó con un obstáculo
  checkDead = () => {
    setInterval(() => {
      if (
        this.rock.overlaps(this.rock.element, this.character.body) ||
        this.bee.overlaps(this.bee.element, this.character.body)) {
          alert("Game Over");
      }
    }, 10);
  }

  checkCoin = () => {
    setInterval(() => {
      if (coin.isTouched(character)) {
        this.updateScore();
        coin.animate();
        if (this.score == this.maxScore) {
          coin.div.addEventListener('animationend', () => this.showWinMessage())
        }
      }
    }, 10);
  }

  showWinMessage = () => {
    alert(`FELICITACIONES, HAS CONSEGUIDO LAS ${this.maxScore} MONEDAS!!`)
  }

  updateScore = () => {
    this.score++;
    this.scoreDiv.innerHTML = this.score;
  }

}