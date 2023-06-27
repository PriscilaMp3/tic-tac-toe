//ARREGLAR QUE CUANDO TOCA PARA ESCRIBIR QUE NO PUEDA ESCRIBIR HASTA QUE LA MAQUINA NO HAYA MARCADO
let casilla = ["", "", "", "", "", "", "", "", ""]; //casillas//
let JugadorActual = "X";
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

// Determinar con una funcion y un for el ganador //
function checkWinner(player) {
  for (let combinacion of combinacionesGanadoras) {
    if (
      casilla[combinacion[0]] === player &&
      casilla[combinacion[1]] === player &&
      casilla[combinacion[2]] === player
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

// Función para hacer un movimiento del jugador
function playerMove(index) {
  if (casilla[index] === "") {
    // Realizar el movimiento del jugador
    casilla[index] = JugadorActual;

    document.getElementsByClassName("celda")[index].innerText = JugadorActual;

    // Verificar el resultado
    if (checkWinner(JugadorActual)) {
      setTimeout(() => {
        showMessage("¡Has ganado!");
        showPopup();
      }, 100);
    } else if (checkDraw()) {
      setTimeout(() => {
        showMessage("¡Empate!");
        showPopup();
      }, 100);
    }

    // Cambiar el jugador actual
    JugadorActual = "O";

    // Dejar que el ordenador haga su movimiento
    setTimeout(computerMove, 500);
  }
}

// Función para que el ordenador haga su movimiento
function computerMove() {
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

  // Verificar el resultado
  if (checkWinner("O")) {
    setTimeout(() => {
      showMessage("¡Has perdido!");
      showPopup();
    }, 100);
  } else if (checkDraw()) {
    setTimeout(() => {
      showMessage("¡Empate!");
      showPopup();
    }, 100);
  }

  // Cambiar el jugador actual
  JugadorActual = "X";
}

// Función para reiniciar el juego
function resetGame() {
  casilla = ["", "", "", "", "", "", "", "", ""];
  JugadorActual = "X";
  const buttons = document.getElementsByClassName("celda");
  for (let button of buttons) {
    button.innerText = "";
  }
  hidePopup();
}

// Funciones de la ventana emergente
function showPopup() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("hide");
}

function hidePopup() {
  const popup = document.querySelector(".popup");
  popup.classList.add("hide");
}

//realizar un modal como mensaje de entrada al juego QUE DIGA INICIAR EL JUEGO......

function showMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.innerText = message;
}

// Reiniciar juego al hacer clic en "Restart"

// reiniciar el juego por medio de una actualizacion de la pagina.....
document.getElementById("restart").addEventListener("click", resetGame);

// Iniciar un nuevo juego al hacer clic en "New Game" en la ventana emergente
document.getElementById("new-game").addEventListener("click", () => {
  hidePopup();
  resetGame();
});

// Obtén una referencia a cada botón del juego
const buttons = document.getElementsByClassName("celda");

// Asigna el evento de clic a cada botón
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    playerMove(i);
  });
}

