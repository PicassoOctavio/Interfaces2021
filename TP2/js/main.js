function init() {
  // defino canvas
  const canvas = document.querySelector('canvas');
  
  // creo Juego
  const juego = new Juego(canvas);
  
  // creo ficha
  //const ficha = new Ficha(40, 40, 20);

  // la agrego al juego
  //juego.addFicha(ficha);

  
  // creo tablero
  const tablero = new Tablero(6, 6);
  
  const btnEmpezar = document.querySelector(".js-btn-start");
  btnEmpezar.addEventListener("click", () => juego.empezar(tablero));

  // lo agrego al juego
  //juego.setTablero(tablero);
  
  // empiezo el juego
  //juego.empezar();
  
  // set nombre jugador Uno
  const btnJugadorUno = document.querySelector('.js-btn-setName');
  const nameJugadorUno = document.querySelector('.nameJugUno');
  let showJugadorUno = document.querySelector('.nameJugadorUno');
  btnJugadorUno.addEventListener("click", 
    () => juego.setNombreJugador( nameJugadorUno, showJugadorUno )); 

  // set nombre jugador Uno
  const btnJugadorDos = document.querySelector('.js-btn-setNameDos');
  const nameJugadorDos = document.querySelector('.nameJugDos');
  let showJugadorDos = document.querySelector('.nameJugadorDos');
  btnJugadorDos.addEventListener( "click", 
    () => juego.setNombreJugador( nameJugadorDos, showJugadorDos )); 

}

document.addEventListener('DOMContentLoaded', init);
