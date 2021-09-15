class Canvas {

  canvas;
  context;
  width;
  height;

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.whiten();
  }

  /* Devuelve la posición x del puntero (dentro del canvas) haciendo:
  posición 'x' del mouse - distancia del canvas al borde izquierdo */
  getX(event) {
    return event.clientX - this.canvas.getBoundingClientRect().left;
  }

  /* Devuelve la posición y del puntero (dentro del canvas) haciendo:
  posición 'y' del mouse - distancia del canvas al tope del documento */
  getY(event) {
    return event.clientY - this.canvas.getBoundingClientRect().top;
  }

  // dibuja la imagen en el canvas y en caso de que exceda el tamaño del canvas
  // reduce su tamaño manteniendo las proporsiones de la imagen original
  drawImage(img) {
    let imageData;
    if ( ! this.fits(img) ) {
      let scale = Math.min( this.canvas.width / img.width, this.canvas.height / img.height );
      this.context.drawImage(img, 0, 0, img.width * scale, img.height * scale);
      imageData = this.context.getImageData( 0, 0, img.width * scale, img.height * scale );
    } else {
      this.context.drawImage(img, 0, 0, img.width, img.height);
      imageData = this.context.getImageData( 0, 0, img.width , img.height );
    }
    this.context.putImageData( imageData, 0, 0 );
  }

  // Devuelve true si las dimensiones de la imagen son menores a las del canvas
  fits(img) {
    return img.width < this.canvas.width && img.height < this.canvas.height
  }

  // Pinta el canvas de color blanco
  whiten() {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // dibuja una linea continua mientras los eventos sean mousedown/mousemove
  drawLine(x0, y0, x1, y1, tool) {
    this.context.beginPath();
    this.context.strokeStyle = tool.getColor();
    this.context.lineWidth = tool.getSize();
    this.context.lineCap = 'round';
    this.context.moveTo( x1, y1);
    this.context.lineTo( x0, y0 );
    this.context.stroke();
  }

}