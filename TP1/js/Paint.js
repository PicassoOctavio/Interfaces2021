class Paint {

  canvas;
  lapiz;

  constructor() {
    this.canvas = new Canvas();
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
    let dotSize = this.lapiz.getDotSize();
    this.canvas.context.fillStyle = this.lapiz.getColor();
    this.canvas.context.beginPath();
    this.canvas.context.arc(x, y, dotSize, 0, 2 * Math.PI);
    this.canvas.context.fill();
  }

}