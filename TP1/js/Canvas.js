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

  drawImage(img) {
    // get the scale
    var scale = Math.min( this.canvas.width / img.width, this.canvas.height / img.height );
    // get the top left position of the image
    var x = ( this.canvas.width / 2) - (img.width / 2) * scale;
    var y = ( this.canvas.height / 2) - (img.height / 2) * scale;
    this.context.drawImage(img, x, y, img.width * scale, img.height * scale);
    let imageData = this.context.getImageData( 0, 0, img.width * scale, img.height * scale );// get imageData from content of canvas
    this.context.putImageData( imageData, 0, 0 );
  }

  whiten() {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

}