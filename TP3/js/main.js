// Creo personaje
const characterElement = document.querySelector('.js-character');
const character = new Character(characterElement);

// Creo bloque
const blockElement = document.querySelector('.js-block');
const block = new Block(blockElement);

// Checkea cada 10 milisegundos si el personaje chocó con el bloque
// checkDead = () => {
//   setInterval(function() {
//     if (block.overlaps(block.block, character.body)) {
//         alert("Game Over");
//     }
//   }, 10);
// }

document.addEventListener('DOMContentLoaded', checkDead)

