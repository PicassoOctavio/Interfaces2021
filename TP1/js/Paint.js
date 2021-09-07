class Paint {

  canvas;
  isClickDown;
  lastClickedX;
  lastClickedY;
  tools;
  currentTool;

  constructor() {
    this.canvas = new Canvas();
    this.listenMouseMove();
    this.listenMouseDown();
    this.listenMouseUp();
    this.tools = [];
    this.currentTool = null;
  }

  addTool(tool) {
    this.tools.push(tool);
  }

  listenMouseDown() {
    this.canvas.canvas.addEventListener('mousedown', (e) => {
      this.currentTool = this.getCurrentTool();
      if (this.currentTool) {
        this.isClickDown = true;
        let x = this.canvas.getX(e);
        let y = this.canvas.getY(e);
        this.drawLine(x, y, x, y);
      }
    })
  }

  // retorna la herramienta que está siendo seleccionada en el paint
  getCurrentTool() {
    for (let i = 0; i < this.tools.length; i++) {
      if (this.tools[i].isClicked()) {
        return this.tools[i]
      }
    }
    return null;
  }

  listenMouseUp() {
    document.addEventListener('mouseup', () => {
      this.isClickDown = false;
    })
  }

  listenMouseMove() {
    this.canvas.canvas.addEventListener('mousemove', (e) => {
      if (this.currentTool != null) {
        if (this.isClickDown && this.currentTool.isClicked()) {
          let x = this.canvas.getX(e);
          let y = this.canvas.getY(e);
          this.drawLine(this.lastClickedX, this.lastClickedY, x, y);
        }
      }
    })
  }

  drawLine(x0, y0, x1, y1) {
    this.canvas.context.beginPath();
    this.canvas.context.strokeStyle = this.currentTool.getColor();
    this.canvas.context.lineWidth = this.currentTool.getDotSize();
    this.canvas.context.lineCap = 'round';
    this.canvas.context.moveTo( x1, y1);
    this.canvas.context.lineTo( x0, y0 );
    this.canvas.context.stroke();
    this.lastClickedX = x1;
    this.lastClickedY = y1;  
  }

}