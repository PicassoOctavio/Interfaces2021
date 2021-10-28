// Creo personaje
const characterElement = document.querySelector('.js-character');
const character = new Character(characterElement);

// Creo roca
const rockElement = document.querySelector('.js-rock-body');
const rock = new Obstacle(rockElement);

// Creo abeja
const beeElement = document.querySelector('.js-bee-body');
const bee = new Obstacle(beeElement);

// Creo coin
const coinElement = document.querySelector('.js-coin');
const coin = new Coin(coinElement);

// Creo juego y agrego todo lo anterior al juego
const game = new Game(200);
game.setCharacter(character);
game.setRock(rock);
game.setCoin(coin);
game.setBee(bee);