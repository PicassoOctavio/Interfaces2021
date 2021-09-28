class Tablero {

  cantFilas;
  cantCols;
  cantFichasColocadas;
  isEmpty;
  celdas;

  constructor(filas, columnas) {
    this.cantFilas = filas;
    this.cantCols = columnas;
    this.cantFichasColocadas = 0;
    this.isEmpty = true;
    this.celdas = [];
    this.setCeldas();
  }

  setCeldas = () => {
    for (let col = 0; col < this.cantCols; col++) {
      for (let fila = 0; fila < this.cantFilas; fila++) {
        let celda = new Celda(fila, col);
        this.celdas.push(celda);
      }
    }
  }

  // ancho en pixeles del tablero
  getAncho = () => {
    return this.cantCols * this.celdas[0].getAncho();
  }

  // le pregunta a la ficha dónde esta y devuelve una celda donde pueda ponerse
  getCeldaLibre = (ficha) => {}

  // determina si una ficha se encuentra encima de alguna de las columnas
  isOverColumn = (ficha) => {}

  draw = (ctx) => {

    for (let i = 0; i < this.celdas.length; i++) {
      let celda = this.celdas[i];
      celda.draw(ctx);
    }
  
  }

}