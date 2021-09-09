class Paint {

  canvas;
  isClickDown;
  lastClickedX;
  lastClickedY;
  tools;
  currentTool;
  btnLoadImage;
  inputFile;


  constructor() {

    this.canvas = new Canvas();
    this.listenMouseMove();
    this.listenMouseDown();
    this.listenMouseUp();
    this.tools = [];
    this.currentTool = null;

    this.btnLoadImage = document.querySelector( '.js-loadImage' );
    this.inputFile = document.querySelector( '.inputFile' );
    this.btnLoadImage.addEventListener("click",  () => {
      console.log( this );
      this.loadImage(); 
    });
    /* this.btnLoadImage.addEventListener( "click", () => {
      console.log( this );
      this.loadImage(); 
    }); */
  }

  loadImage() {
    console.log("entre al load image");
    //Cargar imagen adaptable
    this.inputFile.onchange = e => {
      // getting a hold of the file reference
      let file = e.target.files[0];
      // setting up the reader
      let reader = new FileReader();
      reader.readAsDataURL( file ); 
      reader.onload = readerEvent => {

        let content = readerEvent.target.result; 
        let image = new Image();
        image.src = content;

        image.onload = () => {
          this.scaleToFit( image );
        }
      }
    }
  }

  scaleToFit( img ){
    // get the scale
    var scale = Math.min( this.canvas.canvas.width / img.width, this.canvas.canvas.height / img.height );
    // get the top left position of the image
    var x = ( this.canvas.canvas.width / 2) - ( img.width / 2 ) * scale;
    var y = ( this.canvas.canvas.height / 2) - ( img.height / 2 ) * scale;
    this.canvas.context.drawImage( img, x, y, img.width * scale, img.height * scale );
    let imageData = this.canvas.context.getImageData( 0, 0, img.width * scale, img.height * scale );// get imageData from content of canvas
    this.canvas.context.putImageData( imageData, 0, 0 );
  }
           

  addTool( tool ) {
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

  drawLine( x0, y0, x1, y1 ) {
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