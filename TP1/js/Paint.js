class Paint {

  canvas;
  lapiz;
  isClickDown;
  lastClickedX;
  lastClickedY;

  constructor() {
    this.canvas = new Canvas();
    this.lapiz = new Lapiz(2);
    this.listenMouseMove();
    this.listenMouseDown();
    this.listenMouseUp();
  }

  listenMouseDown() {
    this.canvas.canvas.addEventListener('mousedown', (e) => {
      if (this.lapiz.isClicked()) {
        this.isClickDown = true;
        let x = this.canvas.getX(e);
        let y = this.canvas.getY(e);
        this.drawLine(x, y, x, y);
      }
    })
  }

  listenMouseUp() {
    document.addEventListener('mouseup', () => {
      this.isClickDown = false;
    })
  }

  listenMouseMove() {
    this.canvas.canvas.addEventListener('mousemove', (e) => {
      if (this.isClickDown && this.lapiz.isClicked()) {
        let x = this.canvas.getX(e);
        let y = this.canvas.getY(e);
        this.drawLine(this.lastClickedX, this.lastClickedY, x, y);
      }
    })
  }

  drawLine(x0, y0, x1, y1) {
    this.canvas.context.beginPath();
    this.canvas.context.strokeStyle = this.lapiz.getColor();
    this.canvas.context.lineWidth = this.lapiz.getDotSize();
    this.canvas.context.lineCap = 'round';
    this.canvas.context.moveTo( x1, y1);
    this.canvas.context.lineTo( x0, y0 );
    this.canvas.context.stroke();
    this.lastClickedX = x1;
    this.lastClickedY = y1;  
  }

}