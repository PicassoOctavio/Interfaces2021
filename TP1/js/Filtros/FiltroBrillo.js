class FiltroBrillo{
    
    boton
    slider
    r
    g
    b

    constructor( boton, slider ){
        this.boton = boton;
        this.slider = slider;
        this.coeficiente = 10;
    }

    aplicar = ( canvas ) => {
        let context = canvas.context;
        let imgData = context.getImageData( 0, 0, canvas.width, canvas.height );
        let pixels = imgData.data;
        for (let i = 0; i < pixels.length; i += 4) {
            
            pixels[ i ]    += this.coeficiente;
            pixels[ i + 1] += this.coeficiente;
            pixels[ i + 2] += this.coeficiente;
        }   
        context.putImageData( imgData, 0, 0 );
    }
}