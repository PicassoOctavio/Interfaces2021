class Juego {

  canvas;
  tablero;
  jugadores;
  fichas;
  turno;
  isFinished;
  fichaSeleccionada;
  botonReiniciar;
  tiempo;

  constructor(canvas, tablero, botonReiniciar, tiempo) {
    this.canvas = canvas;
    this.tablero = tablero;
    this.botonReiniciar = botonReiniciar;
    this.tiempo = tiempo;
    botonReiniciar.addEventListener('click', this.reiniciar)
    this.jugadores = [];
    this.fichas = [];
    this.turno = null; // turno es un Jugador. 
    this.isFinished = false; // flag que determina si el juego terminó
    this.fichaSeleccionada = null;
  }

  empezar = () => {
    this.tablero.dibujar();
    repartirFichas();
    dibujarFichas();
    listenMouseDown();
    listenMouseUp();
    listenMouseMove();
    listenMouseOut();
    mostrarTurno(); // muestra en la app el jugador que tiene que jugar
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
      let x = e.clientX;     // Get the horizontal coordinate
      let y = e.clientY;     // Get the vertical coordinate
      for (let i = 0; i < this.fichas.length; i++) {
        let ficha = fichas[i];
        // si se clickeó una ficha y esa ficha pertence al jugador turno...
        if (ficha.isClicked(x, y) && ficha.getOwner() == this.turno) {
          ficha.resaltar();
          this.fichaSeleccionada = ficha;
        }
      }
    })
  }

  listenMouseMove = () => {
    this.canvas.addEventListener('mousemove', (e) => {
      let x = e.clientX;
      let y = e.clientY;
      if (this.fichaSeleccionada) {
        this.fichaSeleccionada.setX(x);
        this.fichaSeleccionada.setY(y);
        dibujarFichas();
      }
    })
  }

  /* Si al soltar el click la ficha queda en alguna zona que pertenezca
  a la 'zona para ingresar' de Tablero, esta redefine su posición y el juego
  se encarga de dibujar las fichas de nuevo */
  listenMouseUp = () => {
    this.canvas.addEventListener('mouseup', () =>  {
      if (this.tablero.isOverColumn(this.fichaSeleccionada)) {
        let celdaLibre = this.tablero.getCeldaLibre(this.fichaSeleccionada);
        if (celdaLibre) {
          this.fichaSeleccionada.setX(celdaLibre.getX());
          this.fichaSeleccionada.setY(celdaLibre.getY());
          dibujarFichas();
          checkGame();
        } else {
          // hay que ver donde dejo la ficha si no se puede agregar
        }
      }
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
    fichas.forEach(ficha => ficha.draw(this.canvas));
  }

  addJugador = (jugador) => {
    this.jugadores.push(jugador);
  }

  addFicha = (ficha) => {
    this.fichas.push(ficha);
  };

  setTurno = (jugador) => {
    this.turno = jugador; 
  }

  terminar = () => {
    this.isFinished = true;
  }

  mostrarGanador = (jugador) => {}; // muestra el ganador en la app



}