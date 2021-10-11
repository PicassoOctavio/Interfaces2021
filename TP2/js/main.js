"use strict"

function init() {
  // defino canvas
  const canvas = document.querySelector('canvas');
  
  // creo Juego
  const juego = new Juego(canvas);
  

  // agrego boton para resetear
  let btnRestart = document.querySelector(".js-btn-restart");
  juego.setRestartButton(btnRestart);
  // creo ficha
  //const ficha = new Ficha(40, 40, 20);

  // la agrego al juego
  //juego.addFicha(ficha);

  
  // creo tablero
  const tablero = new Tablero(6, 6);

  // lo agrego al juego
  juego.setTablero(tablero);

  // creo botón 'Empezar'
  let btnEmpezar = document.querySelector(".js-btn-start");
  

  // lo agrego al juego
  juego.setStartButton(btnEmpezar);
  //juego.setRestartButton(btnRestart);

}

document.addEventListener('DOMContentLoaded', init);
