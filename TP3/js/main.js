
const btnStart = document.querySelector('.js-btn-start');
const beginMessage = document.querySelector('.begin-message');
btnStart.addEventListener('click', () => {

    // Creo personaje
    const characterElement = document.querySelector('.js-character');
    let character = new Character(characterElement);
    console.log(character);
    
    // Creo roca
    const rockDiv = document.querySelector('.rock');
    const rockElement = document.querySelector('.js-rock-body');
    let rock = new Obstacle(rockElement);
    
    // Creo abeja
    const beeDiv = document.querySelector('.bee');
    const beeElement = document.querySelector('.js-bee-body');
    let bee = new Obstacle(beeElement);
    
    // Creo coin
    const coinElement = document.querySelector('.js-coin');
    let coin = new Coin(coinElement);
    
    // Creo juego y agrego todo lo anterior al juego
    const game = new Game(200);
    game.setCharacter(character);
    game.setRock(rock);
    game.setCoin(coin);
    game.setBee(bee);

    // Muestro los elementos integrantes del juego
    characterElement.classList.toggle('display-none');
    rockDiv.classList.toggle('display-none');
    beeDiv.classList.toggle('display-none');
    coinElement.classList.toggle('display-none');
    beginMessage.classList.add('display-none');

});
