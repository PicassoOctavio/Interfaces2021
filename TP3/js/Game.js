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
    this.checkDead();
    this.checkCoin();
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
          let audioHit = new Audio('sounds/hitWithAnObject.wav');
          //audioHit.play();
          //alert("Game Over");
          this.stopObjects();
          this.character.die();
        }
    }, 10);
  }

  // Detiene el movimiento del fondo, de la roca y de la abeja (la abeja sigue aleteando pero no avanza)
  stopObjects = () => {
    // Fondo
    const foregroundTrees = document.querySelector('.js-animation-foreground-trees');
    const backgroundTrees = document.querySelector('.js-animation-background-trees');
    const mountainFar = document.querySelector('.js-animation-mountain-far');
    const mountainNear = document.querySelector('.js-animation-mountain-near');

    foregroundTrees.classList.remove('js-animation-foreground-trees');
    backgroundTrees.classList.remove('js-animation-background-trees');
    mountainFar.classList.remove('js-animation-mountain-far');
    mountainNear.classList.remove('js-animation-mountain-near');

    // Obstaculos
    const bee = document.querySelector('.js-bee-animation');
    bee.classList.remove('js-bee-animation');
    bee.classList.add('js-bee-flying');

    const rock = document.querySelector('.js-rock-move');
    rock.classList.remove('js-rock-move');

  }

  checkCoin = () => {
    setInterval(() => {
      if (this.coin.isTouched(this.character)) {
        this.updateScore();
        this.coin.animate();
        if (this.score == this.maxScore) {
          this.coin.div.addEventListener('animationend', () => this.showWinMessage())
        }
      }
    }, 10);
  }

  showWinMessage = () => {
    //alert(`FELICITACIONES, HAS CONSEGUIDO LAS ${this.maxScore} MONEDAS!!`)
    
    beginMessage.classList.remove('display-none');
    const btnStart = document.querySelector('.js-btn-start');
    const beginMessage = document.querySelector('.begin-message');
    const titleGame = document.querySelector('.js-title-game');
    titleGame.innerHTML = "GANASTE!";
    btnStart.innerHTML = "Nuevo juego";
  }

  updateScore = () => {
    this.score++;
    this.scoreDiv.innerHTML = this.score;
  }

}