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
  
}

document.addEventListener('DOMContentLoaded', init);
