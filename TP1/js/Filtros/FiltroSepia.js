class FiltroSepia {

  boton

  constructor(boton) {
    this.boton = boton;
  }

  aplicar(canvas) {
    let context = canvas.context;
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imgData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      let red   = pixels[i];
      let green = pixels[i + 1];
      let blue  = pixels[i + 2];
      pixels[i]     = (0.393 * red) + (0.769 * green) + (0.189 * blue);
      pixels[i + 1] = (0.349 * red) + (0.686 * green) + (0.168 * blue);
      pixels[i + 2] = (0.272 * red) + (0.534 * green) + (0.131 * blue);
    }
    context.putImageData(imgData, 0, 0);
  }

}