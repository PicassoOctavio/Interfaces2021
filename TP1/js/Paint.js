class Paint {

  canvas;
  isClickDown;
  lastClickedX;
  lastClickedY;
  tools;
  currentTool;

  constructor() {
    this.canvas = new Canvas();
    this.tools = [];
    this.currentTool = null;
    this.listenMouseMove();
    this.listenMouseDown();
    this.listenMouseUp();
  }

  // Agrega herramienta y escucha si se le hace click
  addTool(tool) {
    this.tools.push(tool);
    this.listenTool(tool)
  }

  /* Escucha clicks dentro del canvas. Si hay una heramienta seleccionada,
  dibuja un punto en la posición clickeada */
  listenMouseDown() {
    this.canvas.canvas.addEventListener('mousedown', (e) => {
      console.log(this.currentTool)
      if (this.currentTool) {
        this.isClickDown = true;
        let x = this.canvas.getX(e);
        let y = this.canvas.getY(e);
        this.drawLine(x, y, x, y);
      }
    })
  }

  /* Escucha el click en la herramienta. Si fue clickeada,
  se define como la herramienta actual (currentTool) */
  listenTool(tool) {
    tool.boton.addEventListener('click', () => this.currentTool = tool)
  }

  listenMouseUp() {
    document.addEventListener('mouseup', () => {
      this.isClickDown = false;
    })
  }

  /* Escucha movimiento dentro del canvas. Si hay una heramienta seleccionada
  y se está manteniendo el click presionado, dibuja una linea */
  listenMouseMove() {
    this.canvas.canvas.addEventListener('mousemove', (e) => {
      if (this.currentTool && this.isClickDown) {
        let x = this.canvas.getX(e);
        let y = this.canvas.getY(e);
        this.drawLine(this.lastClickedX, this.lastClickedY, x, y);
      }
    })
  }

  drawLine(x0, y0, x1, y1) {
    this.canvas.context.beginPath();
    this.canvas.context.strokeStyle = this.currentTool.getColor();
    this.canvas.context.lineWidth = this.currentTool.getSize();
    this.canvas.context.lineCap = 'round';
    this.canvas.context.moveTo( x1, y1);
    this.canvas.context.lineTo( x0, y0 );
    this.canvas.context.stroke();
    this.lastClickedX = x1;
    this.lastClickedY = y1;  
  }

}