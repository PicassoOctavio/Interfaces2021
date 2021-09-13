class FiltroBlur {

  boton

  constructor(boton) {
    this.boton = boton;
  }

  aplicar(canvas) {
    let imageData = canvas.context.getImageData(0, 0, canvas.width, canvas.height)
    for (let x = 0; x < canvas.width; x ++) {
      for (let y = 0; y < canvas.height; y++) {
        let redsAround = this.getRedsAround(x, y, imageData);
        if (x == 1 && y == 1) {
          console.log(imageData)
        }
        let redAvg = this.getAvg(redsAround);
        let greenAround = this.getGreenAround(x, y, imageData);
        let greenAvg = this.getAvg(greenAround);
        let blueAround = this.getBlueAround(x, y, imageData);
        let blueAvg = this.getAvg(blueAround);
        this.setPixel(imageData, x, y, redAvg, greenAvg, blueAvg, 255)
      }
    }
    canvas.context.putImageData(imageData, 0, 0);
  }

  getAvg(array) {
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
      suma = suma + array[i];
    }
    return suma / array.length + 1;
  }

  getBlueAround(x, y, imageData) {
    let blue = [];

    // izquierda
    if (x - 1 >= 0) blue.push(this.getBlue(imageData, x-1, y));
    // izquierda arriba
    if (x-1 >= 0 && y-1 >= 0) blue.push(this.getBlue(imageData, x-1, y-1));
    // arriba
    if (y-1 >= 0) blue.push(this.getBlue(imageData, x, y-1));
    // arriba derecha
    if (x+1 < imageData.width && y-1 >= 0) blue.push(this.getBlue(imageData, x+1, y-1));
    // derecha
    if (x+1 < imageData.width) blue.push(this.getBlue(imageData, x+1, y))
    // derecha abajo
    if (x+1 < imageData.width && y+1 < imageData.height) blue.push(this.getBlue(imageData, x+1, y+1));
    // abajo
    if (y+1 < imageData.height) blue.push(this.getBlue(imageData, x, y+1));
    // abajo izquierda
    if (x-1 >= 0 && y+1 < imageData.height) blue.push(this.getBlue(imageData, x-1, y+1));
    
    return blue;
  }

  getGreenAround(x, y, imageData) {
    let green = [];

    // izquierda
    if (x - 1 >= 0) green.push(this.getGreen(imageData, x-1, y));
    // izquierda arriba
    if (x-1 >= 0 && y-1 >= 0) green.push(this.getGreen(imageData, x-1, y-1));
    // arriba
    if (y-1 >= 0) green.push(this.getGreen(imageData, x, y-1));
    // arriba derecha
    if (x+1 < imageData.width && y-1 >= 0) green.push(this.getGreen(imageData, x+1, y-1));
    // derecha
    if (x+1 < imageData.width) green.push(this.getGreen(imageData, x+1, y))
    // derecha abajo
    if (x+1 < imageData.width && y+1 < imageData.height) green.push(this.getGreen(imageData, x+1, y+1));
    // abajo
    if (y+1 < imageData.height) green.push(this.getGreen(imageData, x, y+1));
    // abajo izquierda
    if (x-1 >= 0 && y+1 < imageData.height) green.push(this.getGreen(imageData, x-1, y+1));
    
    return green;
  }

  getRedsAround(x, y, imageData) {
    let reds = [];

    // izquierda
    if (x - 1 >= 0) reds.push(this.getRed(imageData, x-1, y));
    // izquierda arriba
    if (x-1 >= 0 && y-1 >= 0) reds.push(this.getRed(imageData, x-1, y-1));
    // arriba
    if (y-1 >= 0) reds.push(this.getRed(imageData, x, y-1));
    // arriba derecha
    if (x+1 < imageData.width && y-1 >= 0) reds.push(this.getRed(imageData, x+1, y-1));
    // derecha
    if (x+1 < imageData.width) reds.push(this.getRed(imageData, x+1, y))
    // derecha abajo
    if (x+1 < imageData.width && y+1 < imageData.height) reds.push(this.getRed(imageData, x+1, y+1));
    // abajo
    if (y+1 < imageData.height) reds.push(this.getRed(imageData, x, y+1));
    // abajo izquierda
    if (x-1 >= 0 && y+1 < imageData.height) reds.push(this.getRed(imageData, x-1, y+1));
    
    return reds;
  }

  setPixel(imageData, x, y, r, g, b, a) {
    let index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
  }

  getRed(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 0];
  }

  getGreen(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 1];
  }

  getBlue(imageData, x, y) {
    let index = (x + y * imageData.width) * 4;
    return imageData.data[index + 2];
  }

}