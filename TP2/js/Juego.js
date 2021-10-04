class Juego {

  canvas;
  context;
  tablero;
  jugadores;
  fichas;
  turno;
  isFinished;
  fichaSeleccionada;
  botonReiniciar;
  tiempo;
  cantFichas;

  constructor(canvas, tablero, botonReiniciar, tiempo) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.tablero = tablero;
    this.botonReiniciar = botonReiniciar;
    this.tiempo = tiempo;
    // botonReiniciar.addEventListener('click', this.reiniciar)
    // array de strings con los nombres de cada jugador
    this.jugadores = [];
    this.fichas = [];
    this.turno = null; // turno es un Jugador. 
    this.isFinished = false; // flag que determina si el juego terminó
    this.fichaSeleccionada = null;
    this.cantFichas = 36;
  }

  setTablero = (tablero) => this.tablero = tablero;

  empezar = (tablero) => {
    console.log("entro");
      this.setTablero( tablero );
      this.cargarFichas();
      this.dibujarFichas();
      this.tablero.draw(this.context);
      // repartirFichas();

      const msjTurnoUno = "Es turno del jugador "+ this.obtenerNombreJugador(0);
      this.mostrarMensaje( msjTurnoUno );


      this.listenMouseDown();
      this.listenMouseUp();
      this.listenMouseMove();
      // this.listenMouseOut();
      // mostrarTurno(); // muestra en la app el jugador que tiene que jugar
    
    /* //mostrar cartel de advertencia que se debe setear los jugadores
    console.log("Deben existir al menos dos jugadores");
    const mensaje = "Deben existir al menos dos jugadores";
    this.mostrarMensaje( mensaje ); */
    
  }

  /* cargarFichas = () => {
    const y = 40;
    let x = 90;
    for (let i = 0; i <= this.cantFichas; i ++){
      const ficha = new Ficha(x, y, 20, this.context);
      this.addFicha( ficha );
      x += 50;
    }
  } */

  
  cargarFichas = () => {
    let y = 100;
    let x = 40;
    for (let i = 0; i <= this.cantFichas / 2; i ++){
      const ficha = new Ficha(x, y, 20, this.context);
      this.addFicha( ficha );
      y += 50;
      if ( y >= 580 && i <=17 ){
        x = 100;
        y = 100;
      }
    }
    x = 1080;
    y = 100;
    for (let i = 0; i <= this.cantFichas / 2; i ++){
      const ficha = new Ficha(x, y, 20, this.context);
      this.addFicha( ficha );
      y += 50;
      if ( y >= 530 && i >= 9 ){
        x = 1140;
        y = 100;
      }
    }
  }
 

  mostrarBienvenida = () => {
    // poder elegir nombre de los jugadores
    // poder elegir las dimensiones del tablero
    // poder elegir tipo de ficha
    // poder elegir tiempo de juego
    // mostrar ayuda
    // mostrar botón 'Jugar'
  }

  reiniciar = () => {} // reiniciar el juego

  /* escucha el click en canvas (si se clickea una ficha
  la resalta y le dice al juego que el click se está presionando)*/
  listenMouseDown = () => {
    this.canvas.addEventListener('mousedown', (e) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left; //x position within the element.
      let y = e.clientY - rect.top;  //y position within the element.
      console.log("x:", x, "| y:", y);
      for (let i = 0; i < this.fichas.length; i++) {
        let ficha = this.fichas[i];
        // si se clickeó una ficha y esa ficha pertence al jugador turno...
        // if (ficha.isClicked(x, y) && ficha.getOwner() == this.turno) {
        if ( ficha.isClicked(x, y) ) {
          this.fichaSeleccionada = ficha;
        }
        else {
          ficha.desmarcar( this.context );
        }
      }
    })
  }

  listenMouseMove = () => {
    this.canvas.addEventListener('mousemove', (e) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left; //x position within the element.
      let y = e.clientY - rect.top;  //y position within the element.

      if ( this.fichaSeleccionada ) {
        this.fichaSeleccionada.setX(x);
        this.fichaSeleccionada.setY(y);
        this.dibujarFichas();
        this.tablero.draw(this.context);
      }
    })
  }

  /* Si al soltar el click la ficha queda en alguna zona que pertenezca
  a la 'zona para ingresar' de Tablero, esta redefine su posición y el juego
  se encarga de dibujar las fichas de nuevo */
  listenMouseUp = () => {
    this.canvas.addEventListener('mouseup', () =>  {
      // if (this.tablero.isOverColumn(this.fichaSeleccionada)) {
        // let celdaLibre = this.tablero.getCeldaLibre(this.fichaSeleccionada);
        // if (celdaLibre) {
          // this.fichaSeleccionada.setX(celdaLibre.getX());
          // this.fichaSeleccionada.setY(celdaLibre.getY());
          this.dibujarFichas();
          this.tablero.draw(this.context);
          // checkGame();
        // } else {
          // hay que ver donde dejo la ficha si no se puede agregar
        // }
      // }
      this.fichaSeleccionada = null
    });
  }

  /* Determina si se puede seguir jugando.
  En caso de que no, se imprime el jugador ganador (o el empate).
  Si se puede jugar, cambia el turno al siguiente jugador */
  checkGame = () => {}

  // Cada ficha del juego se dibuja en el canvas
  dibujarFichas = () => {
    // ojo que hay que dibujarlas separado (las del j1 a la izq y las del j2 a la der)
    this.whiten();
    this.fichas.forEach(ficha => ficha.draw(this.context));
  }

  // Pinta el canvas de color blanco
  whiten = () => {
    this.context.fillStyle = "#ffffff";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addJugador = (jugador) => {
    this.jugadores.push(jugador);
  }

  addFicha = (ficha) => {
    this.fichas.push(ficha);
  };

  // --------------------- jugador funcitons ---------------------------------

  obtenerNombreJugador = (pos) => {
    return this.jugadores[pos].value;
  }

  setTurno = (jugador) => {
    this.turno = jugador; 
  }
  
  terminar = () => {
    this.isFinished = true;
  }
  
  existenDosJugadores = () => {
    return this.jugadores.length === 2;
  }
  // -------------------------------------------------------------------------

  mostrarMensaje = ( mensaje ) => {
    let alert = document.querySelector('.alert');
    document.querySelector('.alert').hidden = false;
    alert.innerHTML = mensaje;
  }

  habilitarBtnEmpezar = () => {
    document.querySelector('.js-btn-start').disabled = false;
  }

  mostrarGanador = (jugador) => {}; // muestra el ganador en la app

  /* ------------ seteo de nombres ------------ */
  setNombreJugador = ( nameJugador, showName ) => {
    console.log( "nameJugador", nameJugador.value );
    showName.innerHTML = nameJugador.value;
    //agregando el jugador a lista de jugadores
    this.addJugador(nameJugador);
    console.log("this.jugadores", this.jugadores, this.jugadores.length);
    if ( this.existenDosJugadores() ){
      this.habilitarBtnEmpezar();
    }
  }
}