class FiltroDeteccionBordes {

  boton
  kernelX; // matriz que se utiliza para calcular estimaciones de las derivadas en la horizontal vertical de una imagen
  kernelY; // matriz que se utiliza para calcular estimaciones de las derivadas en la dirección vertical de una imagen

  constructor(boton) {
    this.boton = boton;
    this.kernelX = [[-1,0,1], [-2,0,2], [-1,0,1]];
    this.kernelY = [[-1,-2,-1], [0,0,0], [1,2,1]];
  }

  // valor del rojo en un pixel determinado
  getRed(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
  }

  // valor del verde en un pixel determinado
  getGreen(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
  }

  // valor del azul en un pixel determinado
  getBlue(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
  }

  // agrega a los datos de la imagen la info de un pixel determinado
  setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
  }

/*
  Convoluciona el kernelX con una matrix de 3x3 cuyo centro es el pixel
  en x, y. De esta manera se obtiene un escalar que indica la probabilidad
  de haber encontrado un borde en el eje horizontal.
  Cuanto más grande el número más alta la probabilidad.
*/
  getPixelGx(imageData, x, y) {
    return this.kernelX[0][0] * this.getRed(imageData, x - 1, y - 1) +
    this.kernelX[0][1] * this.getRed(imageData, x, y - 1) +
    this.kernelX[0][2] * this.getRed(imageData, x + 1, y - 1) +
    this.kernelX[1][0] * this.getRed(imageData, x - 1, y) +
    this.kernelX[1][1] * this.getRed(imageData, x, y) +
    this.kernelX[1][2] * this.getRed(imageData, x + 1, y) +
    this.kernelX[2][0] * this.getRed(imageData, x - 1, y + 1) +
    this.kernelX[2][1] * this.getRed(imageData, x, y + 1) +
    this.kernelX[2][2] * this.getRed(imageData, x + 1, y + 1)
  }
  
/*
  Convoluciona el kernelY con una matrix de 3x3 cuyo centro es el pixel
  en x, y. De esta manera se obtiene un escalar que indica la probabilidad
  de haber encontrado un borde en el eje vertical.
  Cuanto más grande el número más alta la probabilidad.
*/
  getPixelGy(imageData, x, y) {
    return this.kernelY[0][0] * this.getRed(imageData, x - 1, y - 1) +
    this.kernelY[0][1] * this.getRed(imageData, x, y - 1) +
    this.kernelY[0][2] * this.getRed(imageData, x + 1, y - 1) +
    this.kernelY[1][0] * this.getRed(imageData, x - 1, y) +
    this.kernelY[1][1] * this.getRed(imageData, x, y) +
    this.kernelY[1][2] * this.getRed(imageData, x + 1, y) +
    this.kernelY[2][0] * this.getRed(imageData, x - 1, y + 1) +
    this.kernelY[2][1] * this.getRed(imageData, x, y + 1) +
    this.kernelY[2][2] * this.getRed(imageData, x + 1, y + 1)
  }

  aplicar = (canvas) => {
    let imageData = canvas.context.getImageData(0, 0, canvas.width, canvas.height);
    let imageDataCopy = canvas.context.getImageData(0, 0, canvas.width, canvas.height);
    
    /* Para llevar a cabo la detección de bordes solo se necesita
    un canal. Por eso se aplica un filtro de escala de grises */
    let f = new FiltroEscalaGrises();
    f.aplicar(canvas);
    
    /* Se recorre la imagen y por cada pixel se posa una matriz
    de 3x3 que se convoluciona con los kernel de Sobel */
    for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        let pixelGx = this.getPixelGx(imageData, x, y);        
        let pixelGy = this.getPixelGy(imageData, x, y);
        // Se calcula la magnitud del gradiente, la cual nos dice cuan fuerte es el borde
        let gradientMagnitude = Math.sqrt((pixelGx * pixelGx) + (pixelGy * pixelGy));
        this.setPixel(imageDataCopy, x, y, gradientMagnitude, gradientMagnitude, gradientMagnitude, 255);
      }
    }
    canvas.context.putImageData(imageDataCopy, 0, 0);
  }

}