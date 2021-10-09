"use strict"
class Celda {

  fila;
  columna;
  ficha;
  empty;
  image; // eventualmente la celda será una imagen
  ancho;
  alto;
  x = 350;  // The x-coordinate of the upper-left corner of the rectangle	
  y = 120;  // The y-coordinate of the upper-left corner of the rectangle	


  constructor(fila, columna) {
    this.fila = fila;
    this.columna = columna;
    this.ficha = null;
    this.empty = true;
    this.image;
    this.ancho = 80;
    this.alto = 80;
    this.x += this.ancho * this.columna;
    this.y += this.alto * this.fila;
  }

  getFicha = () => {
    return this.ficha;
  }

  isEmpty = () => {
    return this.empty;
  }

  addFicha = (ficha) => {
    this.ficha = ficha;
    this.empty = false;
  }

  // devuelve las coordenadas del centro de la celda
  getCenter = () => {
    let centro = {};
    centro.x = this.x + this.ancho / 2;
    centro.y = this.y + this.alto / 2;
    return centro;
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

  //dibuja cada cerca
  draw = (ctx) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.rect(this.x, this.y, this.ancho, this.alto);
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "#48FAB8";

    //genero los huecos
    ctx.arc((this.x + 40), (this.y + 40), 20, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill('evenodd');
  }

}