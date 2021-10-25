"use strict"

function init() {

  document.body.style.backgroundImage = "url('img/fondo1.jpg')";
  // defino canvas
  const canvas = document.querySelector('canvas');
  const filas = 6;
  let columnas;
  // creo Juego
  const juego = new Juego(canvas);
  
  let dimensiones = document.querySelector('.dimensiones');

  dimensiones.addEventListener("change", () => {
    columnas = dimensiones.value;
    juego.setTablero(filas, columnas);
  });
  
  // agrego boton para resetear
  let btnRestart = document.querySelector(".js-btn-restart");
  juego.setRestartButton(btnRestart);
  // creo ficha
  //const ficha = new Ficha(40, 40, 20);
  
  // la agrego al juego
  //juego.addFicha(ficha);
  
  
  // creo tablero
  //const tablero = new Tablero(6, 6);
  
  // lo agrego al juego
  //juego.setTablero(tablero);

  // creo botón 'Empezar'
  const btnEmpezar = document.querySelector(".js-btn-start");
  

  // lo agrego al juego
  juego.setStartButton(btnEmpezar);
  //juego.setRestartButton(btnRestart);

}

document.addEventListener('DOMContentLoaded', init);


/* 
Check list
- Poner instrucciones de juego
- Avisar la cantidad de fichas para ganar en linea
- cambiar colores 
- meter sonido 
*/