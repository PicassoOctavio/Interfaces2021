function init() {
  // defino canvas
  const canvas = document.querySelector('canvas');
  
  // creo Juego
  const juego = new Juego(canvas);
  
  // creo ficha
  const ficha = new Ficha(40, 40, 20);
  
  // la agrego al juego
  juego.addFicha(ficha);
  
  // empiezo el juego
  juego.empezar();
  
}

document.addEventListener('DOMContentLoaded', init);
