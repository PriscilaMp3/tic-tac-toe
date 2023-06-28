//ARREGLAR QUE CUANDO TOCA PARA ESCRIBIR QUE NO PUEDA ESCRIBIR HASTA QUE LA MAQUINA NO HAYA MARCADO
let casilla = ["", "", "", "", "", "", "", "", ""]; //casillas array de 9 elementos que se encuentras vacios//
let JugadorActual = "X"; // una variable para indicar que el jugador inicial inicia con "X"
let Jugadordiv = document.querySelector(".Jugadores");
let Jugador = document.getElementById("Player");
let Click = true;
const combinacionesGanadoras = [
  [0, 1, 2], // Filas
  [3, 4, 5], // Filas
  [6, 7, 8], // Filas
  [0, 3, 6], // Columnas
  [1, 4, 7], // Columnas
  [2, 5, 8], // Columnas
  [0, 4, 8], // Diagonales
  [2, 4, 6], // Diagonales
];

// Se guardan todos los botones en una variable
const buttons = document.getElementsByClassName("celda");

// el for hará un recorrido del array de botones "buttons", y detectará cuando algún botón seleccionado llamando a la función playerMove enviandole su posición
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    if (Click) {
      playerMove(i);
    }
  });
}

// Función para hacer un movimiento del jugador
function playerMove(posicion) {
  if (Click && casilla[posicion] === "") {

    Click = false;
    // Realizar el movimiento del jugador
    casilla[posicion] = JugadorActual;

    document.getElementsByClassName("celda")[posicion].innerText = JugadorActual; //inyectamos en el botón seleccionado la "X" del Jugador actual
    // llama la función checkWinner enviandole la X del jugador
    if (checkWinner(JugadorActual)) {
      setTimeout(() => {
        mostrarmensaje("¡Has ganado!");
        mostraremer();
        Jugadordiv.classList.add("hide");
      }, 100);
    } else if (checkDraw()) {
      setTimeout(() => {
        mostrarmensaje("¡Empate!");
        mostraremer();
        Jugadordiv.classList.add("hide");
      }, 100);
    }
    Jugador.innerText = "Computadora"
    // Cambiar el jugador actual
    JugadorActual = "O";
    // Dejar que el ordenador haga su movimiento
    setTimeout(computerMove, 1000);
  }
}

// Esta función recibe el "X" del jugador haciendo una validación con la variable casilla por medio del for y todas las posibles combinaciones ganadoras, 
// Si alguna de las combinaciones se cumple donde los 3 espacios son "X" devolverá un true, si no encuentra que los 3 campos de las combinaciones son X devolverá un false
function checkWinner(jugadorP) {
  for (let combinacion of combinacionesGanadoras) {
    if (
      casilla[combinacion[0]] === jugadorP &&
      casilla[combinacion[1]] === jugadorP &&
      casilla[combinacion[2]] === jugadorP
    ) {
      return true;
    }
  }
  return false;
}

// Determinar con una funcion si hay un empate
function checkDraw() {
  return !casilla.includes("");
}


// Función para que el ordenador haga su movimiento
function computerMove() {
  if(JugadorActual === "O"){
    // Obtener una lista de movimientos válidos
    const validMoves = casilla.reduce((acc, cell, index) => {
      if (cell === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    // Elegir un movimiento al azar de los disponibles
    const randomIndex = Math.floor(Math.random() * validMoves.length);
    const computerChoice = validMoves[randomIndex];
    casilla[computerChoice - 1];

    // Realizar el movimiento del ordenador
    casilla[computerChoice] = "O";
    document.getElementsByClassName("celda")[computerChoice].innerText = "O";
    Jugador.innerText = "Jugador 1"
    // Verificar el resultado
    if (checkWinner("O")) {
      setTimeout(() => {
        mostrarmensaje("¡Has perdido!");
        mostraremer();
        Jugadordiv.classList.add("hide");
      }, 100);
    } else if (checkDraw()) {
      setTimeout(() => {
        mostrarmensaje("¡Empate!");
        mostraremer();
        Jugadordiv.classList.add("hide");
      }, 100);
    }

    // Cambiar el jugador actual
    JugadorActual = "X";
    Click = true;
  }
}


// Función para reiniciar el juego
function resetGame() {
  casilla = ["", "", "", "", "", "", "", "", ""];
  JugadorActual = "X";
  const buttons = document.getElementsByClassName("celda");
  for (let button of buttons) {
    button.innerText = "";
  }
  esconderemer();
}

// Funciones de la ventana emergente
function mostraremer() {
  const emer = document.querySelector(".emergente");
  emer.classList.remove("hide");
}

function esconderemer() {
  const emer = document.querySelector(".emergente");
  emer.classList.add("hide");
  Jugadordiv.classList.remove("hide");
  Jugador.innerText = "Jugador 1"
  Click = true;
}

//realizar un modal como mensaje de entrada al juego QUE DIGA INICIAR EL JUEGO......

function mostrarmensaje(message) {
  const messageElement = document.getElementById("message");
  messageElement.innerText = message;
}

// Reiniciar juego al hacer clic en "Restart"

// reiniciar el juego por medio de una actualizacion de la pagina.....
document.getElementById("restart").addEventListener("click", resetGame);

// Iniciar un nuevo juego al hacer clic en "New Game" en la ventana emergente
document.getElementById("new-game").addEventListener("click", () => {
  esconderemer();
  resetGame();
});


