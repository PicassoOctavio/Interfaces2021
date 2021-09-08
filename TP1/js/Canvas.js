class Canvas {

  canvas;
  context;

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
  }

  /* Devuelve la posición x del puntero (dentro del canvas)
  haciendo posición 'x' del mouse - distancia del canvas al borde izquierdo */
  getX(event) {
    return event.clientX - this.canvas.getBoundingClientRect().left;
  }

  /* Devuelve la posición y del puntero (dentro del canvas)
  haciendo posición 'y' del mouse - distancia del canvas al tope del documento */
  getY(event) {
    return event.clientY - this.canvas.getBoundingClientRect().top;
  }

}