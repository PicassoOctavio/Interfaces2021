class Tablero {

  cantFilas;
  cantCols;
  cantFichasColocadas;
  isEmpty;
  celdas;
  zonas;

  constructor(filas, columnas) {
    this.cantFilas = filas;
    this.cantCols = columnas;
    this.cantFichasColocadas = 0;
    this.isEmpty = true;
    this.celdas = [];
    this.zonas = [];
    this.setCeldas();
    this.setZonas();
  }

  addFicha = (ficha) => {
    let celda = this.getCeldaLibre(ficha);
    celda.addFicha(ficha);
  }

  setCeldas = () => {
    for (let col = 0; col < this.cantCols; col++) {
      for (let fila = 0; fila < this.cantFilas; fila++) {
        let celda = new Celda(fila, col);
        this.celdas.push(celda);
      }
    }
  }

  // por cada columna agrega al arreglo 'zonas' un objeto que contiene
  // los puntos inicio y fin de cada celda
  setZonas = () => {
    for (let i = 0; i < this.celdas.length; i+=this.cantCols) {
      let celda = this.celdas[i];
        this.zonas.push({
          inicio: celda.getX(),
          fin: celda.getAncho() + celda.getX()
        }) 
    }
  }

  // Dada una ficha, devuelve la columna a la cual quiere ingresar
  getColumn = (ficha) => {
    let x = ficha.getX();
    for (let i = 0; i < this.zonas.length; i++) {
      let zona = this.zonas[i];
      if (zona.inicio <= x && x <= zona.fin) {
        return i
      }
    }
    return null
  }

  // ancho en pixeles del tablero
  getAncho = () => {
    return this.cantCols * this.celdas[0].getAncho();
  }

  // le pregunta a la ficha dónde esta y devuelve una celda donde pueda ponerse
  getCeldaLibre = (ficha) => {
    let col = this.getColumn(ficha);
    for (let i = this.celdas.length - 1; i >= 0; i--) {
      let celda = this.celdas[i];
      if (celda.getColumna() == col && celda.isEmpty()) {
        return celda;
      }
    }
    return null;
  }

  seFormoLinea = (celda, winLine) => {
    return  this.checkDown(celda, winLine) ||
            this.checkHorizontal(celda, winLine)
  }

  checkDown = (celda, winLine) => {
    let fichas = this.getFichasDown(celda);
    return this.checkLinea(fichas, winLine);
  }

  checkHorizontal = (celda, winLine) => {
    let fichas = this.getFichasHorizontal(celda);
    return this.checkLinea(fichas, winLine);
  }

  /* dado un arreglo de fichas determina si existe una linea 
  de tamaño 'winLine' que contenga fichas del mismo dueño */
  checkLinea = (fichas, winLine) => {
    let count = 1;
    for (let i = 0; i < fichas.length; i++) {
      let ficha = fichas[i];
      if (ficha) {
        let owner = ficha.getOwner();
        if (i+1 < fichas.length) {
          if (fichas[i+1]) {
            if (fichas[i+1].getOwner() == owner) {
              count++
              if (count == winLine) {
                return true;
              }
            } else {
              count = 1;
            }
          }
        }
      }
    }
    return count == winLine
  } 

  getFichasDown(celda) {
    let col = celda.getColumna();
    let fichas = [];
    for (let i = 0; i < this.celdas.length; i++) {
      let _celda = this.celdas[i];
      if (_celda.getColumna() == col) {
        fichas.push(_celda.getFicha());
      }
    }
    return fichas;
  }

  getFichasHorizontal(celda) {
    let fila = celda.getFila();
    let fichas = [];
    for (let i = 0; i < this.celdas.length; i++) {
      let _celda = this.celdas[i];
      if (_celda.getFila() == fila) {
        fichas.push(_celda.getFicha());
      }
    }
    return fichas;
  }

  // determina si una ficha se encuentra encima de alguna de las columnas
  isOverColumn = (ficha) => {}

  draw = (ctx) => {

    for (let i = 0; i < this.celdas.length; i++) {
      let celda = this.celdas[i];
      celda.draw(ctx);
    }
  
  }

}