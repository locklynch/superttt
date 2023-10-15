// initialize board as single array
// [0], [1], [2]
// [3], [4], [5]
// [6], [7], [8]

// function GameBoard() {
//   this.board = ['', '', '', '', '', '', '', '', ''];
// }

// const gameBoard = Array(9).fill(null).map(() => new GameBoard());

const gameBoard = {
  board0: ['', '', '', '', '', '', '', '', ''],
  board1: ['', '', '', '', '', '', '', '', ''],
  board2: ['', '', '', '', '', '', '', '', ''],
  board3: ['', '', '', '', '', '', '', '', ''],
  board4: ['', '', '', '', '', '', '', '', ''],
  board5: ['', '', '', '', '', '', '', '', ''],
  board6: ['', '', '', '', '', '', '', '', ''],
  board7: ['', '', '', '', '', '', '', '', ''],
  board8: ['', '', '', '', '', '', '', '', '']
};


console.log(gameBoard)



// Screw all of this for now!!! Just learn the 9 Arrays gameBoard Object!
 // Define Win Patterns as arrays
 const winPatterns = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonals
  [0, 4, 8],
  [2, 4, 6]
];




function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
  this.moves = [];
}

// make player objects
const player1 = new Player('player 1', 'X', []);
const player2 = new Player('Player 2', 'O', []);
console.log(player1);
console.log(player2);

    
// game starts with player 1
let currentPlayer = player1;

// function for superTTT move
function makeMove(boardIndex, cellIndex) {
  // const board = gameBoard['board${boardIndex}'];

    if (isCellEmpty(boardIndex, cellIndex)) {
    // Add the move to the current player's moves array
    currentPlayer.moves.push({boardIndex, cellIndex});

    // Update the board or game state as needed
    gameBoard[boardIndex].board[cellIndex] = currentPlayer.symbol;
    console.log(currentPlayer)

    // Check for a win or draw
    if (checkWin(currentPlayer)) {
      displayResult(currentPlayer);
    } else if (checkDraw(currentPlayer)) {
      displayResult('Tie');
    } else {
      console.log(currentPlayer);
      // Switch to the next player
      currentPlayer = (currentPlayer === player1) ? player2 : player1;
      document.getElementById('status').textContent = `Player ${currentPlayer.name}'s turn`;
    }

    // Update the visual board
    updateBoard();
  }
}
// OLD MAKE MOVE FUNCTION
// // Function to make a move
// function makeMove(boardIndex, cellIndex) {
//   if (isCellEmpty(boardIndex, cellIndex)) {
//     // Add the move to the current player's moves array
//     currentPlayer.moves.push({boardIndex, cellIndex});

//     // Update the board or game state as needed
//     gameBoard[boardIndex].board[cellIndex] = currentPlayer.symbol;
//     console.log(currentPlayer)

//     // Check for a win or draw
//     if (checkWin(currentPlayer)) {
//       displayResult(currentPlayer);
//     } else if (checkDraw(currentPlayer)) {
//       displayResult('Tie');
//     } else {
//       console.log(currentPlayer);
//       // Switch to the next player
//       currentPlayer = (currentPlayer === player1) ? player2 : player1;
//       document.getElementById('status').textContent = `Player ${currentPlayer.name}'s turn`;
//     }

//     // Update the visual board
//     updateBoard();
//   }
// }

function isCellEmpty(boardIndex, cellIndex) {
  // check if the cell is empty based on the moves arrays
  return !player1.moves.some(move => move.cellIndex === cellIndex && move.boardIndex === boardIndex) &&
         !player2.moves.some(move => move.cellIndex === cellIndex && move.boardIndex === boardIndex);
}

// Function to check for a win condition
function checkWin(player) {
  for (const pattern of winPatterns) {
    const hasWin = pattern.every(cellPosition =>
      player.moves.some(move => move.cellIndex === cellPosition)
    );

    if (hasWin) {
      return true; // A win is detected
    }
  }

  return false; // No win found
}

// Function to check for a draw
function checkDraw() {
  // Check if every cell on the board is occupied
  const isBoardFilled = gameBoard[boardIndex].board.flat().every(cell => cell !== '');

  // Check if there is no win condition for both players
  const noWinConditionMet = !checkWin(player1) && !checkWin(player2);

  // Return true if the board is filled and no win condition is met
  return isBoardFilled && noWinConditionMet;
}

// Function to update the visual board
function updateBoard() {
  const cells = document.querySelectorAll('.cell');

  // Clear the board by removing text content from all cells
  cells.forEach(cell => {
    cell.textContent = '';
  });

  // Update the board with player moves
  player1.moves.forEach(move => {
    const index = move.cellIndex;
    cells[index].textContent = player1.symbol;
  });

  player2.moves.forEach(move => {
    const index = move.cellIndex;
    cells[index].textContent = player2.symbol;
  });
}

// Function to display the result
function displayResult(result) {
  const resultDiv = document.getElementById('result');
  const winnerText = document.getElementById('winner-text');
  const restartButton = document.getElementById('restart-button');
  const statusText = document.getElementById('status'); // Get the status text element

  if (result === 'Tie') {
    winnerText.textContent = "It's a tie!";
  } else {
    winnerText.textContent = `Player ${result.name} wins!`;
  }

  resultDiv.classList.remove('hidden');
  statusText.style.display = 'none'; // Hide the turn status when the game is over
  restartButton.style.display = 'block'; // Show the restart button
}

// Function to reset the game
function resetGame() {
  // Clear player moves and reset the board
  player1.moves = [];
  player2.moves = [];
  currentPlayer = player1;
  gameBoard.board = ['', '', '', '', '', '', '', '', '']
  console.log(gameBoard);

  // Clear the result display and show the turn status
  const resultDiv = document.getElementById('result');
  const statusText = document.getElementById('status');
  const restartButton = document.getElementById('restart-button');

  resultDiv.classList.add('hidden'); // Hide the result display
  restartButton.style.display = 'none'; // Hide the restart button
  statusText.style.display = 'block'; // Show the turn status

  // Update the visual board
  updateBoard();

  // Reset the status text to indicate the current player's turn
  statusText.textContent = `Player ${currentPlayer.name}'s turn`;
}