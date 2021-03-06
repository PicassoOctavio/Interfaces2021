class FiltroSaturacion{
    
    boton
    slider
    r
    g
    b

    constructor( boton, slider ){
        this.boton = boton;
        this.slider = slider;
    }

    aplicar( canvas ){
        let context = canvas.context;
        let imgData = context.getImageData( 0, 0, canvas.width, canvas.height );
        let pixels = imgData.data;
        let r, g, b;

        // SATURACION: agarrar un pixel y convertirlo de rgb a hsb, aumentarle la S, y convertirlo de nuevo a rgb
        console.log("pixels.length", pixels.length);
        for (let i = 0; i < pixels.length; i += 4) {
            r = pixels[i];        
            g = pixels[i + 1];
            b = pixels[i + 2];

            let objHsv = this.rgb_to_hsv(r , g , b);
            
            objHsv.s += 0.5; //<-- valor a cambiar con un posible slider
            
            let objRgb = this.hsv_to_rgb( objHsv.h, objHsv.s, objHsv.v );
            
            pixels[ i ]    = objRgb.r;
            pixels[ i + 1] = objRgb.g;
            pixels[ i + 2] = objRgb.b;
        }   
        context.putImageData( imgData, 0, 0 );
    }

    rgb_to_hsv(r, g, b) {
        if (arguments.length === 1) {
            g = r.g, b = r.b, r = r.r;
        }
        var max = Math.max(r, g, b), min = Math.min(r, g, b),
            d = max - min,
            h,
            s = (max === 0 ? 0 : d / max),
            v = max / 255;
    
        switch (max) {
            case min: h = 0; break;
            case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
            case g: h = (b - r) + d * 2; h /= 6 * d; break;
            case b: h = (r - g) + d * 4; h /= 6 * d; break;
        }
        
        return {
            h: h,
            s: s,
            v: v
        };
    }

    hsv_to_rgb( h, s, v ) {

        var r, g, b, i, f, p, q, t;
        if ( arguments.length === 1 ) {
            s = h.s, v = h.v, h = h.h;
        }

        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
}