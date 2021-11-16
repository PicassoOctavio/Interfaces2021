class Game {

  constructor(maxScore, main) {
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
    this.main = main;
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
    const interval = setInterval(() => {
      if (
        this.rock.overlaps(this.rock.element, this.character.body) ||
        this.bee.overlaps(this.bee.element, this.character.body)) {
          this.stopObjects();
          this.character.die();
          this.playAudioGameOver();
          this.displayGameOver();
          clearInterval(interval);
        }
      }, 10);
    }

    // Muestra un div indicando que perdiste y que para jugar de nuevo pulses F5
    displayGameOver = () => {
      const subtitle = document.querySelector('.js-subTitle');
      const beginMessage = document.querySelector('.begin-message');
      const titleGame = document.querySelector('.js-title-game');
      const btnStart = document.querySelector('.js-btn-start');
      btnStart.classList.add('display-none');
      beginMessage.classList.remove('display-none');
      titleGame.innerHTML = "Perdiste!";
      subtitle.innerHTML = "Pulsa F5 para jugar nuevamente"
    }

    // Reproduce audios de choque contra obstáculo y fin de juego
    playAudioGameOver = () => {
      let audioHit = new Audio('sounds/hitWithAnObject.wav');
      audioHit.play();
      let audioGameOver = new Audio('sounds/gameOver.wav');
      audioGameOver.play();
    }
    
    // Detiene el movimiento del fondo, de la roca y de la abeja
    stopObjects = () => {
      // Fondo
      this.stopBackground();
      
      // Obstaculos
      this.bee.pauseMovement();
      this.rock.pauseMovement();
      this.coin.div.remove();
    }

    stopBackground = () => {
      const foregroundTrees = document.querySelector('.js-animation-foreground-trees');
      const backgroundTrees = document.querySelector('.js-animation-background-trees');
      const mountainFar = document.querySelector('.js-animation-mountain-far');
      const mountainNear = document.querySelector('.js-animation-mountain-near');
      
      foregroundTrees.classList.add('pause-animation');
      backgroundTrees.classList.add('pause-animation');
      mountainFar.classList.add('pause-animation');
      mountainNear.classList.add('pause-animation');
    }
    
    checkCoin = () => {
      setInterval(() => {
        if (this.coin.isTouched(this.character)) {
          this.updateScore();
          this.coin.animate();
          this.checkWin();
        }
      }, 10);
    }

    checkWin = () => {
      if (this.score == this.maxScore) {
        this.coin.div.addEventListener('animationend', () => {
          this.showWinMessage();
          this.playWinSound();
          this.ocultarElementos();
        })
      }
    }
    
    showWinMessage = () => {
      const btnStart = document.querySelector('.js-btn-start');
      const beginMessage = document.querySelector('.begin-message');
      const titleGame = document.querySelector('.js-title-game');
      const subtitle = document.querySelector('.js-subTitle');

      beginMessage.classList.remove('display-none');
      btnStart.classList.add('display-none');

      titleGame.innerHTML = "GANASTE!";
      subtitle.innerHTML = "Pulsa F5 para jugar nuevamente"      
    }

    ocultarElementos = () => {
      this.character.element.classList.add('display-none');
      this.rock.element.parentNode.classList.add('display-none');
      this.bee.element.parentNode.classList.add('display-none');
      this.coin.div.classList.add('display-none');
    }

    playWinSound = () => {
      let audioGameOver = new Audio('sounds/winSound.wav');
      audioGameOver.play();
    }
    
    updateScore = () => {
      this.score++;
      this.scoreDiv.innerHTML = this.score;
    }
    
}