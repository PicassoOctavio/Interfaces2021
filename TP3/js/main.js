// Creo personaje
const characterElement = document.querySelector('.js-character');
const character = new Character(characterElement);

// Cuando se presiona la tecla 'flecha arriba' le digo al personaje que salte
document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowUp') {
    character.jump()    
  }
});
