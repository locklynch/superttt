// Initialize the Tic-Tac-Toe board as a 3x3 array
const board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let currentPlayer = 'X';
let gameOver = false;

// Function to check if the game is over
function checkGameOver() {
  // Check rows, columns, and diagonals for a win
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer ||
      board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer ||
      board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer ||
      board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer
    ) {
      gameOver = true;
      alert(`Player ${currentPlayer} wins!`);
      return;
    }
  }

  // Check for a tie
  if (!gameOver && board.flat().every(cell => cell !== '')) {
    gameOver = true;
    alert("It's a tie!");
    return;
  }

  // Switch to the other player
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Function to handle a click on a cell
function cellClick(row, col) {
  if (!gameOver && board[row][col] === '') {
    board[row][col] = currentPlayer;
    document.getElementById(`cell${row}${col}`).textContent = currentPlayer;
    checkGameOver();
  }
}

// Create the HTML table for the board
const boardElement = document.createElement('table');
for (let i = 0; i < 3; i++) {
  const rowElement = document.createElement('tr');
  for (let j = 0; j < 3; j++) {
    const cellElement = document.createElement('td');
    cellElement.id = `cell${i}${j}`;
    cellElement.addEventListener('click', () => cellClick(i, j));
    rowElement.appendChild(cellElement);
  }
  boardElement.appendChild(rowElement);
}

document.body.appendChild(boardElement);
