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
  btnStart;

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

  setStartButton = (btn) => {
    this.btnStart = btn;
    this.btnStart.addEventListener('click', () => this.empezar());
  }

  setTablero = (tablero) => this.tablero = tablero;

  cargarJugadores = () => {
    // Creo jugador 1
    const namePlayer1 = document.querySelector('.js-player-1');
    const player1 = new Jugador(namePlayer1.value);

    // Creo jugador 2
    const namePlayer2 = document.querySelector('.js-player-2');
    const player2 = new Jugador(namePlayer2.value);

    // Agrego los jugadores al juego
    this.addJugador(player1);
    this.addJugador(player2);
  }

  empezar = () => {
      this.cargarJugadores();
      this.cargarFichas();
      this.dibujarFichas();
      this.tablero.draw(this.context);
      this.turno = this.jugadores[0];

      this.listenMouseDown();
      this.listenMouseUp();
      this.listenMouseMove();
      // this.listenMouseOut();

      this.mostrarTurno();
  }

  mostrarTurno = () => {
    console.log(this.turno)
    const turnPlayerMsg = document.querySelector('.js-turn-player');
    turnPlayerMsg.classList.remove('js-display-none');
    turnPlayerMsg.innerHTML = `Es el turno de ${this.turno.nombre}`;
  }
  
  cargarFichas = () => {
    let y = 100;
    let x = 40;
    for (let i = 0; i <= this.cantFichas / 2; i ++){
      const ficha = new Ficha(x, y, 20, 'red', this.jugadores[0]);
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
      const ficha = new Ficha(x, y, 20, 'blue', this.jugadores[1]);
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
      for (let i = 0; i < this.fichas.length; i++) {
        let ficha = this.fichas[i];
        if (ficha.isClicked(x, y)) {
          // si la ficha pertenece al turno y si la ficha no está en el tablero...
          if (ficha.getOwner().nombre == this.turno.nombre && ! ficha.isColocada()) {
            this.fichaSeleccionada = ficha;
          }
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
      if (this.fichaSeleccionada) {
        if (this.tablero.getColumn(this.fichaSeleccionada) != null) {
          let celdaLibre = this.tablero.getCeldaLibre(this.fichaSeleccionada);
          if (celdaLibre) {
            this.fichaSeleccionada.setX(celdaLibre.getCenter().x);
            this.fichaSeleccionada.setY(celdaLibre.getCenter().y);
            this.fichaSeleccionada.colocada(true);
            celdaLibre.empty = false;
            this.dibujarFichas();
            this.tablero.draw(this.context);
            this.checkGame();
          // } else {
            // hay que ver donde dejo la ficha si no se puede agregar
          }
        }
      }
      this.fichaSeleccionada = null
    });
  }

  /* Determina si se puede seguir jugando.
  En caso de que no, se imprime el jugador ganador (o el empate).
  Si se puede jugar, cambia el turno al siguiente jugador */
  checkGame = () => {
    // if tablero no está lleno y no hay ganador... then
    this.turno = this.getTurn();
    this.mostrarTurno();
  }

  getTurn = () => {
    for (let i = 0; i < this.jugadores.length; i++) {
      let jugador = this.jugadores[i];
      if (jugador != this.turno) {
        return jugador;
      }
    }
  }

  // Cada ficha del juego se dibuja en el canvas
  dibujarFichas = () => {
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
  
  terminar = () => {
    this.isFinished = true;
  }

  mostrarGanador = (jugador) => {}; // muestra el ganador en la app

}