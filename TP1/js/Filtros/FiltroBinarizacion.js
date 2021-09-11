class FiltroBinarizacion {

    boton

    constructor( boton ){
        this.boton = boton;
    }

    aplicar( canvas ) {
       
        let context = canvas.context;
        let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = imgData.data;
        let umbral = 60;

        for (let i = 0; i < pixels.length; i += 4){
            let promedio = Math.floor( (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3);
            if ( promedio > umbral ){
                pixels[i + 0] = 255;
                pixels[i + 1] = 255;
                pixels[i + 2] = 255;
            }
            else {
                pixels[i + 0] = 0;
                pixels[i + 1] = 0;
                pixels[i + 2] = 0;
            }
        }
        context.putImageData(imgData, 0, 0);
    }





}