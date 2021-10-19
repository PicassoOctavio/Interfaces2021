// Creo personaje
const characterElement = document.querySelector('.js-character');
const character = new Character(characterElement);

// Creo bloque
const blockElement = document.querySelector('.js-block');
const block = new Block(blockElement);

// Cuando se presiona la tecla 'flecha arriba' le digo al personaje que salte
document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowUp') {
    character.jump()    
  }
});

// Checkea cada 10 milisegundos si el personaje chocó con el bloque
checkDead = () => {
  setInterval(function() {
    if (block.wasCrashed(character)) {
        alert("Game Over");
    }
  }, 10);
}

document.addEventListener('DOMContentLoaded', checkDead)

