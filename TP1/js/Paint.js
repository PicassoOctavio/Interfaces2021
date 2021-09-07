class Paint {

  canvas;
  context;
  lapiz;

  constructor() {
    this.canvas = new Canvas();
    this.context = this.canvas.canvas.getContext('2d');
    this.lapiz = new Lapiz(2);
  }

  listen() {
    this.canvas.canvas.addEventListener('mousedown', (e) => {
      if (this.lapiz.isClicked()) {
        let x = this.canvas.getX(e);
        let y = this.canvas.getY(e);
        this.drawDot(x, y)
      }
    })
  }

  drawDot(x, y) {
    this.context.fillStyle = this.lapiz.getColor();
    let dotSize = this.lapiz.getDotSize();
    this.context.beginPath(); //Start path
    this.context.arc(x, y, dotSize, 0, 2 * Math.PI); // Draw a point using the arc function of the canvas with a point structure.
    this.context.fill(); // Close the path and fill.
  }

}