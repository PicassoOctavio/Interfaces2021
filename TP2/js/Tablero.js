class Tablero {

  cantFilas;
  cantCols;
  cantFichasColocadas;
  isEmpty;

  constructor(filas, columnas) {
    this.cantFilas = filas;
    this.cantCols = columnas;
    this.cantFichasColocadas = 0;
    this.isEmpty = true;
  }

  // le pregunta a la ficha dónde esta y devuelve una celda donde pueda ponerse
  getCeldaLibre = (ficha) => {}

  // determina si una ficha se encuentra encima de alguna de las columnas
  isOverColumn = (ficha) => {}

  draw = (ctx) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(140, 140, 140, 140);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }

}