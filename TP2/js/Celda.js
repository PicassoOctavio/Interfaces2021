class Celda {

  fila;
  columna;
  ficha;
  isEmpty;
  image; // eventualmente será una imagen

  constructor(fila, columna) {
    this.fila = fila;
    this.columna = columna;
    this.ficha = null;
    this.isEmpty = true;
    this.image;
  }

  isEmpty = () => {
    return this.isEmpty;
  }

  

}