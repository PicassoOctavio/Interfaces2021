// Creo personaje
const characterElement = document.querySelector('.js-character');
const character = new Character(characterElement);

// Creo bloque
const blockElement = document.querySelector('.js-block');
const block = new Block(blockElement);

// Creo coin
const coinElement = document.querySelector('.js-coin');
const coin = new Coin(coinElement);

// Creo juego y agrego todo lo anterior al juego
const game = new Game(1);
game.setCharacter(character);
game.setBlock(block);
game.setCoin(coin);