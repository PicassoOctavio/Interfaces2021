class Paint {

  canvas;
  isClickDown;
  lastClickedX;
  lastClickedY;
  tools;
  currentTool;
  buttonLoadImage;

  constructor() {
    this.canvas = new Canvas();
    this.tools = [];
    this.currentTool = null;
    this.buttonLoadImage;
    this.listenMouseMove();
    this.listenMouseDown();
    this.listenMouseUp();
  }

  addButtonLoadImage(button) {
    this.buttonLoadImage = button;
    this.listenLoadImage();
  }

  listenLoadImage() {
    this.buttonLoadImage.addEventListener('click', async () => {
      let inputFile = document.querySelector('.js-input-file');
      inputFile.click();
      let image = await this.getImage(inputFile);
      this.canvas.whiten();
      this.canvas.drawImage(image);
    })
  }

  getImage(inputFile) {
    return new Promise((resolve, reject) => {
      inputFile.onchange = e => {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = readerEvent => {
          let content = readerEvent.target.result;
          let image = new Image();
          image.src = content;
          image.onload = () => { resolve (image); }
        }
      }
    })
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

  /* es posible hacer este metodo en la clase Canvas.js pasando
  por parametro la herramienta --> drawLine(x0, y0, x1, y1, tool) */
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