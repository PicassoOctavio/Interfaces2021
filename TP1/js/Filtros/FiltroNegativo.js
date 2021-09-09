class FiltroNegativo {

  boton

  constructor(boton) {
    this.boton = boton;
  }

  aplicar(canvas) {
    let context = canvas.context;
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imgData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = 255 - pixels[i]; // rojo
      pixels[i + 1] = 255 - pixels[i + 1]; // verde
      pixels[i + 2] = 255 - pixels[i + 2]; // azul
    }
    context.putImageData(imgData, 0, 0);
  }

}