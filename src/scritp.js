
// Variables globales
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6] // Diagonales
];

// Función para verificar si alguien ha ganado
function checkWinner(player) {
  for (let combination of winningCombinations) {
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      return true;
    }
  }
  return false;
}

// Función para verificar si hay un empate
function checkDraw() {
  return !board.includes('');
}

// Función para hacer un movimiento del jugador
function playerMove(index) {
  if (board[index] === '') {
    // Realizar el movimiento del jugador
    board[index] = currentPlayer;
    document.getElementsByClassName('button-option')[index].innerText = currentPlayer;

    // Verificar el resultado
    if (checkWinner(currentPlayer)) {
      setTimeout(() => {
        showMessage('¡Has ganado! Inténtalo de nuevo.');
        showPopup();
      }, 100);
    } else if (checkDraw()) {
      setTimeout(() => {
        showMessage('¡Empate! Inténtalo de nuevo.');
        showPopup();
      }, 100);
    }

    // Cambiar el jugador actual
    currentPlayer = 'O';

    // Dejar que el ordenador haga su movimiento
    setTimeout(computerMove, 500);
  }
}

// Función para que el ordenador haga su movimiento
function computerMove() {
  // Obtener una lista de movimientos válidos
  const validMoves = board.reduce((acc, cell, index) => {
    if (cell === '') {
      acc.push(index);
    }
    return acc;
  }, []);

  // Elegir un movimiento al azar de los disponibles
  const randomIndex = Math.floor(Math.random() * validMoves.length);
  const computerChoice = validMoves[randomIndex];

  // Realizar el movimiento del ordenador
  board[computerChoice] = 'O';
  document.getElementsByClassName('button-option')[computerChoice].innerText = 'O';

  // Verificar el resultado
  if (checkWinner('O')) {
    setTimeout(() => {
      showMessage('¡Has perdido! Inténtalo de nuevo.');
      showPopup();
    }, 100);
  } else if (checkDraw()) {
    setTimeout(() => {
      showMessage('¡Empate! Inténtalo de nuevo.');
      showPopup();
    }, 100);
  }

  // Cambiar el jugador actual
  currentPlayer = 'X';
}

// Función para reiniciar el juego
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  const buttons = document.getElementsByClassName('button-option');
  for (let button of buttons) {
    button.innerText = '';
  }
  hidePopup();
}

// Funciones de la ventana emergente
function showPopup() {
  const popup = document.querySelector('.popup');
  popup.classList.remove('hide');
}

function hidePopup() {
  const popup = document.querySelector('.popup');
  popup.classList.add('hide');
}

function showMessage(message) {
  const messageElement = document.getElementById('message');
  messageElement.innerText = message;
}

// Reiniciar juego al hacer clic en "Restart"
document.getElementById('restart').addEventListener('click', resetGame);

// Iniciar un nuevo juego al hacer clic en "New Game" en la ventana emergente
document.getElementById('new-game').addEventListener('click', () => {
  hidePopup();
  resetGame();
});
