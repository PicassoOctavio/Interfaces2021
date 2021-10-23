"use strict"
class Juego {

  canvas;
  context;
  tablero;
  jugadores;
  fichas;
  turno;
  isFinished = false;
  fichaSeleccionada;
  botonReiniciar;
  tiempo;
  cantFichas;
  btnStart;
  backgroundImage;
  btnRestart;
  timer;

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
    this.isFinished; // flag que determina si el juego terminó
    this.fichaSeleccionada = null;
    this.cantFichas = 36;
    this.winLine = 4;
    this.oldXFicha;
    this.oldYFicha;
    this.canvas.style.visibility = "hidden";
  }

  setTiempoRestante = () => {
    document.querySelector(".tiempo").hidden = false;
    let tiempoTerminado = false;

    let oldDateObj = new Date();
    let newDateObj = new Date();
    // en caso de querer menos tiempo reemplazar el 5 por 0.1 (sería 5 seg)
    newDateObj.setTime(oldDateObj.getTime() + (5 * 60 * 1000));
    //console.log(newDateObj);
    this.timer = setInterval(function(){
      if (!tiempoTerminado){
        let horaNow = new Date().getTime();
        let distancia = newDateObj - horaNow;
        let minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        let segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        if (minutos === 0 && segundos === 0){
          tiempoTerminado = true;
        }
        
        document.querySelector(".timer").innerHTML= minutos +":"+ segundos;
      }
      else{
        document.querySelector(".timer").innerHTML= "Se acabó el tiempo.";
        clearInterval(this.timer);
        //console.log("this.isFinished", this.isFinished);
      }
    });
  }

  // CONTINUAR!
  setBackgroundImage = () => {
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'img/fondo.jpg';

    this.backgroundImage.onload = () => {
      this.context.drawImage( this.backgroundImage, 0, 0 );   
    }
    /* this.context.drawImage( this.backgroundImage, 0, 0, 
      this.canvas.width, this.canvas.height ); */
  }

  /* 
  var background = new Image();
  background.src = "http://www.samskirrow.com/background.png";

  // Make sure the image is loaded first otherwise nothing will draw.
  background.onload = function(){
      ctx.drawImage(background,0,0);   
  } */

  setStartButton = (btn) => {
    this.btnStart = btn;
    this.btnStart.addEventListener('click', () => this.empezar());
  }

  //setTablero = (tablero) => this.tablero = tablero;
  setTablero = ( filas, columnas ) => {
    this.tablero = new Tablero( filas, parseInt(columnas));
  }

  cargarJugadores = () => {
    // Creo jugador 1
    const namePlayer1 = document.querySelector('.js-player-1');
    const player1 = namePlayer1.value;

    // Creo jugador 2
    const namePlayer2 = document.querySelector('.js-player-2');
    const player2 = namePlayer2.value;

    console.log( "player1", player1, "player2", player2 );
    // Agrego los jugadores al juego
    if ( player1 != '' && player2 != '' ){

      this.addJugador( player1 );
      this.addJugador( player2 );
    }
  }

  setRestartButton = (btn) => {
    btn.addEventListener('click', () => this.reiniciar());
  }

  // reinicia el juego
  reiniciar = () => {
    this.tablero.vaciar();
    this.fichas = [];
    clearInterval(this.timer);
    this.whiten(); 
    this.jugadores = [];
    const player1 = document.querySelector('.js-player-1');
    player1.value = null;
    const player2 = document.querySelector('.js-player-2');
    player2.value = null;
    document.querySelector(".js-tiempo").parentNode.hidden = true;

    this.empezar();

  } 

  empezar = () => {
    this.cargarJugadores();
    console.log(this.jugadores.length)
    if ( this.jugadoresEstanCargados() && this.existeTablero() ){ 
      document.querySelector('.js-canvas').style.visibility = "visible";
      this.setWinLine();
      this.cargarFichas();
      this.dibujarFichas();
      this.tablero.draw(this.context);
      this.turno = this.jugadores[0];
      
      this.listenMouseDown();
      this.listenMouseUp();
      this.listenMouseMove();
      // this.listenMouseOut();
      
      this.mostrarTurno();
      this.setTiempoRestante();
      //this.setBackgroundImage();
      }
      else{
        this.borrarJugadores();
        if(!this.jugadoresEstanCargados()){
          const mensaje = "Ingrese los nombres de los jugadores";
          this.mostrarMensaje( mensaje );
        }
        if ( !this.existeTablero() ){
          const mensaje = "Seleccione las dimensiones del tablero";
          this.mostrarMensaje( mensaje );
          
        }
      }
  }

  mostrarTurno = () => {
    const turnPlayerMsg = document.querySelector('.js-turn-player');
    turnPlayerMsg.classList.remove('js-display-none');
    turnPlayerMsg.innerHTML = `Es el turno de ${this.turno}`;
  }


  mostrarMensaje = ( mensaje ) => {  
    const turnPlayerMsg = document.querySelector('.js-turn-player');
    turnPlayerMsg.classList.remove('js-display-none');
    turnPlayerMsg.innerHTML = mensaje;
  }
  
  cargarFichas = () => {
    this.cantFichas = this.setCantFichas();
    let y = 100;
    let x = 40;
    for (let i = 0; i < this.cantFichas / 2; i ++){
      const ficha = new Ficha(x, y, 20, 'red', this.jugadores[0]);
      this.addFicha( ficha );
      y += 50;
      if ( y >= 580 && i <=17 ){
        x = 100;
        y = 100;
      }
      if ( y >= 580 && i >=17 ){
        x = 160;
        y = 100;
      }
    }
    x = 1020;
    y = 100;
    for (let i = 0; i < this.cantFichas / 2; i ++){
      const ficha = new Ficha(x, y, 20, 'blue', this.jugadores[1]);
      this.addFicha( ficha );
      y += 50;
      if ( y >= 580 && (i >= 9 && i < 18 )){
        x = 1080;
        y = 100;
      }
      if ( y >= 580 && i > 18 ){
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

 

  /* escucha el click en canvas (si se clickea una ficha
  la resalta y le dice al juego que el click se está presionando)*/
  listenMouseDown = () => {
    this.canvas.addEventListener('mousedown', (e) => {
      let rect = e.target.getBoundingClientRect();
      let x = e.clientX - rect.left; //x position within the element.
      let y = e.clientY - rect.top;  //y position within the element.
      console.log("x", x, "|y", y);
      for (let i = 0; i < this.fichas.length; i++) {
        let ficha = this.fichas[i];
        if (ficha.isClicked(x, y)) {
          // si la ficha pertenece al turno y si la ficha no está en el tablero...
          if (ficha.getOwner() == this.turno && ! ficha.isColocada()) {
            this.fichaSeleccionada = ficha;
            this.oldXFicha = this.fichaSeleccionada.getX();
            this.oldYFicha = this.fichaSeleccionada.getY();    
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

      if ( this.fichaSeleccionada && !this.isGameFinished() ) {
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
      if(!this.isGameFinished()){

        if (this.fichaSeleccionada) {
          if (this.tablero.getColumn(this.fichaSeleccionada) != null) {
            let celdaLibre = this.tablero.getCeldaLibre(this.fichaSeleccionada);
            if (celdaLibre) {
              this.fichaSeleccionada.setX(celdaLibre.getCenter().x);
              this.fichaSeleccionada.setY(celdaLibre.getCenter().y);
              this.fichaSeleccionada.colocada(true);
              this.tablero.addFicha(this.fichaSeleccionada);
              celdaLibre.empty = false;
              this.checkGame(celdaLibre);
            // } else {
              // hay que ver donde dejo la ficha si no se puede agregar
            }
          } else {
            this.fichaSeleccionada.setX(this.oldXFicha);
            this.fichaSeleccionada.setY(this.oldYFicha);
          }
          this.dibujarFichas();
          this.tablero.draw(this.context);
          
        }
        this.fichaSeleccionada = null
      }
    });
  }

  /* Determina si se puede seguir jugando.
  En caso de que no, se imprime el jugador ganador (o el empate).
  Si se puede jugar, cambia el turno al siguiente jugador */
  checkGame = (celda) => {
    // if tablero no está lleno y no hay ganador... then
    if (! this.tablero.seFormoLinea(celda, this.winLine) ) {
      this.turno = this.getTurn();
      this.mostrarTurno();
    } 
    else {
      //esta entrando aunque no gano
      this.mostrarGanador();
    }
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
  };

  isGameFinished = () => {
    //console.log("isGameFinished?", this.isFinished);
    return this.isFinished;
  }


  jugadoresEstanCargados = () => {
    //  console.log("this.jugadores.length", this.jugadores.length);
    if (this.jugadores.length === 2 ){
      return true;
    }
    else {
      return false;
    }
  }


  //mostrarGanador = (jugador) => {}; // muestra el ganador en la app

  // muestra el ganador en la app
  mostrarGanador = () => {
    const turnPlayerMsg = document.querySelector('.js-turn-player');
    turnPlayerMsg.classList.remove('js-display-none');
    turnPlayerMsg.innerHTML = `¡GANÓ ${this.turno}!`;
  }; 

  setCantFichas = () => {
    if ( this.tablero ){
      const cantCols = this.tablero.getCantColumn();
      if (cantCols === 6)
        return 36;
      if (cantCols === 7)
        return 42;
      if (cantCols === 8)
        return 48;
    }
  }

  setWinLine = () => {
    if ( this.tablero ){
      const cantCols = this.tablero.getCantColumn();
      if (cantCols === 6)
        this.winLine = 4;
      if (cantCols === 7)
        this.winLine = 5;
      if (cantCols === 8)
        this.winLine = 6;
    }
  }

  borrarJugadores = () => {
    this.jugadores = [];
  }

  existeTablero = () => {
    if ( this.tablero != null){
      return true;
    }
    else {
      return false;
    }
  }

}