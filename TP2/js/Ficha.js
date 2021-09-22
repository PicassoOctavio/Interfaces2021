class Ficha {

  x;              // x-coordinate of the center of the circle	
  y;              // y-coordinate of the center of the circle	
  image;          // imagen de la ficha
  outlineColor;   // color del borde de la ficha cuando se clickea
  radio;          // radio del círculo
  owner;          // indica el jugador que posee la ficha

  constructor(x, y, radio) {
    this.x = x;
    this.y = y;
    this.radio = radio
  }

  setX = (x) => this.x = x;
  
  setY = (y) => this.y = y;

  draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
    ctx.stroke();
  }

  isClicked = (x, y) => {
    let _x = this.x - x;
    let _y = this.y - y;
    console.log(Math.sqrt(_x * _x + _y * _y) < this.radio)
    return Math.sqrt(_x * _x + _y * _y) < this.radio;
  }

  getOwner = () => this.owner;

  resaltar = () => {

  }



}