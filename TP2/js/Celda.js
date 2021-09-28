class Celda {

  fila;
  columna;
  ficha;
  isEmpty;
  image; // eventualmente la celda será una imagen
  ancho;
  alto;
  x;  // The x-coordinate of the upper-left corner of the rectangle	
  y;  // The y-coordinate of the upper-left corner of the rectangle	


  constructor(fila, columna) {
    this.fila = fila;
    this.columna = columna;
    this.ficha = null;
    this.isEmpty = true;
    this.image;
    this.ancho = 80;
    this.alto = 80;
    this.x = this.ancho * this.columna;
    this.y = this.alto * this.fila;
  }

  isEmpty = () => {
    return this.isEmpty;
  }

  getAncho = () => {
    return this.ancho
  };

  getColumna = () => {
    return this.columna;
  }

  getFila = () => {
    return this.fila;
  }

  setX = (x) => this.x = x;

  setY = (y) => this.y = y;

  getX = () => {
    return this.x;
  }

  getY = () => {
    return this.y;
  }


  draw = (ctx) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    console.log(ctx.canvas.clientWidth)
    ctx.rect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }

  

}