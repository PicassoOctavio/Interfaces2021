class Paint {

  canvas;
  isClickDown;
  lastX; // punto del eje x donde se dibujó por última vez
  lastY; // punto del eje y donde se dibujó por última vez
  currentTool;

  constructor() {
    this.canvas = new Canvas();
    this.currentTool = null;
    this.listenMouseMove();
    this.listenMouseDown();
    this.listenMouseUp();
    this.listenMouseOut();
    this.buttonDownload = document.querySelector('.js-button-download');
    this.buttonDownload.addEventListener('click', (e) => {
      this.downloadCanvas(e.currentTarget)
    });
    this.buttonClear = document.querySelector('.js-button-clear');
    this.buttonClear.addEventListener('click', () => {
      this.canvas.whiten();
      this.uncheckFilters();
    })
  }

  // Crea una imagen del canvas y le asigna al anchor la referencia a dicha img
  downloadCanvas = (anchor) => {
    let image = this.canvas.canvas.toDataURL("image/jpg");
    anchor.href = image;
  }

  // si se clickea en el filtro 'f' se lo aplica al canvass
  listenFilter(f) {
    //accedo al btn asignado de la clase filtro
    f.boton.addEventListener('click', () => f.aplicar(this.canvas));
  }

  // si la herramienta es clickeada, se define como currentTool
  listenTool(tool) {
    tool.boton.addEventListener('click', () => this.currentTool = tool)
  }

  // si se clickea el botón 'Subir imagen', esta se pinta en el canvas
  listenButtonUpload(button) {
    button.addEventListener('click', async () => {
      let inputFile = document.querySelector('.js-input-file');
      inputFile.click();
      let image = await this.getImage(inputFile);
      inputFile.value = '';
      this.canvas.whiten();
      this.canvas.drawImage(image);
      this.uncheckFilters();
    })
  }

  // deselecciona el ultimo filtro aplicado
  uncheckFilters() {
    let inputRadios = document.querySelectorAll('input[type="radio"]');
    for (let i = 0; i < inputRadios.length; i++) {
      if (inputRadios[i].checked) {
        inputRadios[i].checked = false;
      }
    }
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

  /* Escucha clicks dentro del canvas. Si hay una heramienta seleccionada,
  dibuja un punto en la posición clickeada */
  listenMouseDown() {
    this.canvas.canvas.addEventListener('mousedown', (e) => {
      if (this.currentTool) {
        this.isClickDown = true;
        let x = this.canvas.getX(e);
        let y = this.canvas.getY(e);
        this.canvas.drawLine(x, y, x, y, this.currentTool);
        this.lastX = x;
        this.lastY = y;
      }
    })
  }

  listenMouseUp() {
    document.addEventListener('mouseup', () => {
      this.isClickDown = false;
    })
  }

  // Si el puntero sale del canvas, deja de dibujar
  listenMouseOut() {
    this.canvas.canvas.addEventListener('mouseout', () => {
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
        this.canvas.drawLine(this.lastX, this.lastY, x, y, this.currentTool)
        this.lastX = x;
        this.lastY = y;  
      }
    })
  }

}