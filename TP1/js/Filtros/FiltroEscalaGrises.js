class FiltroEscalaGrises {

  boton

  constructor() {
    this.boton = document.querySelector('.js-filter-grayscale');
  }

  aplicar(canvas) {
    let context = canvas.context;
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    let pixels = imgData.data;
    for (let i = 0; i < pixels.length; i += 4) {
      // Algoritmo de punto flotante: Gray = R * 0.3 + G * 0.59 + B * 0.11 R = G = B
      let gray = pixels[i] * .3 + pixels[i+1] * .59 + pixels[i+2] * .11
      pixels[i]     = gray;
      pixels[i + 1] = gray;
      pixels[i + 2] = gray;
    }
    context.putImageData(imgData, 0, 0);
  }

}