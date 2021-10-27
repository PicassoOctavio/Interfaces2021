// Creo personaje
const characterElement = document.querySelector('.js-character');
const character = new Character(characterElement);

// Creo bloque
const blockElement = document.querySelector('.js-block');
const block = new Block(blockElement);

// Creo coin
const coinElement = document.querySelector('.js-coin');
const coin = new Coin(coinElement);

// Checkea cada 10 milisegundos si el personaje chocó con el bloque
// checkDead = () => {
//   setInterval(function() {
//     if (block.overlaps(block.block, character.body)) {
//         alert("Game Over");
//     }
//   }, 10);
// }

checkCoin = () => {
  setInterval(function() {
    if (coin.isTouched(character)) {
      // updateScore();
      coin.animate();
    }
  }, 10);
}

console.log(coin.body)

document.addEventListener('DOMContentLoaded', checkCoin)
document.addEventListener('DOMContentLoaded', checkDead)

