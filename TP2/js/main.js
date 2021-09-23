function init() {
  // defino canvas
  const canvas = document.querySelector('canvas');
  
  // creo Juego
  const juego = new Juego(canvas);
  
  // creo ficha
  const ficha = new Ficha(40, 40, 20);

  // la agrego al juego
  juego.addFicha(ficha);

  // creo tablero
  const tablero = new Tablero();
  
  // lo agrego al juego
  juego.setTablero(tablero);
  
  // empiezo el juego
  juego.empezar();
  
}

document.addEventListener('DOMContentLoaded', init);
