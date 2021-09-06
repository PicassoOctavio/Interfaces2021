class Paint {

  canvas;
  context;
  lapiz;

  constructor() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.lapiz = new Lapiz(2);
  }

  listen() {
    // if (this.lapiz.isClicked()) {
      this.canvas.addEventListener('mousedown', (e) => {
        // let x = canvas.getX();
        // let y = canvas.getY();
        // this.drawDot(x, y);
      })
    // }
  }

  drawDot = (x, y) => {
    // this.context.fillStyle = lapiz.getColor();
    // let dotSize = lapiz.getDotSize();
    this.context.beginPath(); //Start path
    this.context.arc(x, y, dotSize, 0, 2 * Math.PI); // Draw a point using the arc function of the canvas with a point structure.
    this.context.fill(); // Close the path and fill.
  }

}