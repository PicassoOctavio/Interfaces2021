class Ficha {

  x;              // x-coordinate of the center of the circle	
  y;              // y-coordinate of the center of the circle	
  image;          // imagen de la ficha
  outlineColor;   // color del borde de la ficha cuando se clickea
  radio;          // radio del círculo
  owner;          // indica el jugador que posee la ficha
  is_clicked;     // indica si la ficha está siendo presionada
  _colocada;      // indica si la ficha está en el tablero
  color;

  constructor(x, y, radio, color, owner) {
    this.x = x;
    this.y = y;
    this.radio = radio
    this.outlineColor = 'red';
    this.color = color;
    this.owner = owner;
  }

  colocada = (valor) => {
    this._colocada = valor;
  }

  isColocada = () => {
    return this._colocada;
  }

  getX = () => {
    return this.x;
  }

  getY = () => {
    return this.y;
  }
 
  setX = (x) => this.x = x;
  
  setY = (y) => this.y = y;

  draw = (ctx) => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    // ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();

    ctx.closePath();
    if (this.is_clicked) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 4;
      // ctx.stroke();    
      ctx.closePath();
    }
  }
  
  marcar = (ctx) => {
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radio, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 4;
    ctx.stroke();
  }
  
  isClicked = (x, y) => {
    let _x = this.x - x;
    let _y = this.y - y;
    this.is_clicked = Math.sqrt(_x * _x + _y * _y) < this.radio;
    return this.is_clicked;
  }
  
  getOwner = () => {
    return this.owner;
  }
  
  desmarcar = (ctx) => {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();
  }



}