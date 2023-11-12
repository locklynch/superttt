// initialize board as object of smaller objects, with a small board array and a winner element
// [0], [1], [2]
// [3], [4], [5]
// [6], [7], [8]

// Basic Function Descriptions

// function makeMove() the main game sequence iteration, made of other functions
  // if moveInCell() resolves, then do the following
  // checkSmallWin, checkSmallDraw(), checkBigWin(), CheckBigDraw()
  // updateLastMove()
  // updateBoard()
  // updateCurrentPlayer()
  // declareWinner()
  // otherwise, return invalid move

// function isCellEmpty() check if gameBoard[index].cell[index] is empty

// function openBoardForMove() only allow correct board to be used in next move (legal move)
  // if gameWinner is null, then do the following
  // if lastMove variable is null, then run isCellEmpty()
  // check lastMove variable against gameBoard[index].winner
    // if gameBoard[index].winner is Draw or player.symbol, then allow moves to any open gameBoard[index]
    // if gameBoard[index].winner is null, then only allow moves to that gameBoard[index]
  // if none of these are true, return false

// function moveInCell(currentPlayer, gameBoard[index], cell[index]) make move on cell
  // use openBoardForMove() to make sure move is legal
    // if legal, then push move to current player.moves array as [gameBoard[index], cell[index]]
    // and update gameBoard[index].cells[index] with player.symbol

// function checkSmallWin() check if move results in gameBoard[index] win
  // check second array elements of player.moves sub arrays that share the same gameBoard[index] as the current move against winPatterns
    // if detected then update gameboard[index].winner with player.symbol, and push gameBoard[index] to player.boardWins array

// function checkSmallDraw() check if move results in board draw
  // check if gameBoard[index].cells is full and gameBoard[index].winner is null
    // if so, update gameBoard[index].winner to Draw

// function checkBigWin() check if checkSmallWin results in game win
  // check player.boardWins array against winPatterns array
    // if a big win is detected, then declare gameWinner to currentPlayer.name

// function checkBigDraw() check if checkSmallDraw results in game draw
  // check if all gameBoard.winner are player symbols, or Draw
    // if so, then declare gameWinner as Draw

// function declareWinner() check if gameWinner isn't null, and if it isn't null, display the winning player

// function updateLastMove() update the lastMove variable with the cell[index] of the new move (which controls which board the next move can play on)

// function updateBoard() update displayed game board with gameBoard state
  // clear displayed game board of all player symbols
  // display symbols based on player1.moves and player2.moves arrays
  // if gameBoard[index].winner is a player.symbol, then change all cells to that symbol
  // displayResult()

// function displayResult() display current player's turn, and if gameWinner is not null, then display gameWinner

// function updateCurrentPlayer() update currentPlayer variable with next player

// function resetGame() reset the game
  // reinitiate gameBoard and players as they were at start of game
  // reinitialize currentPlayer as player 1
  // reinitialize lastMove as null
  // reinitialize lastFullMove as empty set
  // reinitialize gameWinner as empty set
  // clear the result display and show the turn status
  // run updateBoard now that everything is reset


const gameBoard = {
  0: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  1: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  2: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  3: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  4: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  5: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  6: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  7: { cells: ['', '', '', '', '', '', '', '', ''], winner: null },
  8: { cells: ['', '', '', '', '', '', '', '', ''], winner: null }
};

 // Define Win Patterns as arrays to check small board array cells, and also large board object index numbers against
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

// player object constructor
function Player(name, symbol) {
  this.name = name;
  this.symbol = symbol;
  this.moves = [];
  this.boardWins = [];
}

// make player objects
const player1 = new Player('Player 1', 'X', [], []);
const player2 = new Player('Player 2', 'O', [], []);
console.log(player1);
console.log(player2);


// game starts with player 1
let currentPlayer = player1;

// game starts with null lastMove variable, which allows any move
let lastMove = null;

// last full move for use in changing display of last moved cell
let lastFullMove = []

// the winner of the game, starts set to null
let gameWinner = null;

console.log(currentPlayer, lastMove, gameWinner)

// function for superTTT move
function makeMove(boardIndex, cellIndex) {
  const moveMade = moveInCell(boardIndex, cellIndex)

  if(moveMade) {
  checkSmallWin(boardIndex, currentPlayer);
  checkSmallDraw(boardIndex);
  checkBigWin();
  checkBigDraw();
  updateLastMove(boardIndex, cellIndex);
  updateBoard();
  updateCurrentPlayer(boardIndex, cellIndex);
  console.log(gameWinner)
  console.log(lastFullMove)
  declareWinner()
} else {console.log("invalid move!")
  }
}

// check if the cell is empty based on thegameBoard.cells array, to be used in the openBoardForMove function
function isCellEmpty(boardIndex, cellIndex) {
  return (gameBoard[boardIndex].cells[cellIndex] === '' && gameBoard[boardIndex].winner === null);
}

// function to check if move is on a legal board
function openBoardForMove(boardIndex, cellIndex) {
  // If lastMove is null, and the cell is empty, allow the move
  if (gameWinner === null) {
    if (lastMove === null) {
      return isCellEmpty(boardIndex, cellIndex)
    // if lastMove referes to a board's boardIndex that's drawn or won, and the cell to be moved on is empty allow the move
    } else if (gameBoard[lastMove].winner !== null) {
        return isCellEmpty(boardIndex, cellIndex)
    // if the lastMove referes to a board's boardIndex that's not won yet, then 1 of 2 things happen
    } else if (gameBoard[lastMove].winner === null) {
    // if the move being made is on the board dictated by lastMove, make the move if the cell is empty
        if (boardIndex === lastMove) {
          return isCellEmpty(boardIndex, cellIndex)
    // if the move being made is anywher else, do not allow the move
      } else return false
    }
  } else return false
}

// function to actually make move on legal cell
function moveInCell(boardIndex, cellIndex) {
  if (openBoardForMove(boardIndex, cellIndex) === true) {
    currentPlayer.moves.push({boardIndex, cellIndex});
    gameBoard[boardIndex].cells[cellIndex] = currentPlayer.symbol;
    return true
  }
}

// function to check for a win condition on individual board
function checkSmallWin(boardIndex, currentPlayer) {
  for (const pattern of winPatterns) {
    const hasSmallWin = pattern.every(cellPosition => 
      currentPlayer.moves.some(move => move.cellIndex === cellPosition && move.boardIndex === boardIndex)
    );

    if (hasSmallWin) {
      gameBoard[boardIndex].winner = currentPlayer.symbol;
      currentPlayer.boardWins.push(boardIndex)
    }
  }
}

// function to check for a draw on board move is made on
function checkSmallDraw(boardIndex) {
  const isBoardFilled = gameBoard[boardIndex].cells.every(cell => cell !== '');

  if (isBoardFilled === true && gameBoard[boardIndex].winner === null) {
    gameBoard[boardIndex].winner = 'Draw';
  }
}

// function to check if whole game is won
function checkBigWin() {
  for (const pattern of winPatterns) {
    const hasBigWin = pattern.every(boardIndex => currentPlayer.boardWins.includes(boardIndex));

    if (hasBigWin) {
      gameWinner = currentPlayer.name;
    }
  }
}

// function to check if whole game is a draw
function checkBigDraw() {
  const allBoardsFilled = Object.values(gameBoard).every(board => board.winner !== null);

  if (allBoardsFilled) {
    gameWinner = 'Draw'
  }
}

// function to check if gameWinner has a value and display it
function declareWinner() {
  if(gameWinner !== null) {
    displayResult(gameWinner)
  }

}

// function to update lastMove variable
function updateLastMove(boardIndex, cellIndex) {
  lastMove = cellIndex;
  lastFullMove = [boardIndex, cellIndex];
}

// Function to update the visual board and the gameBoard
function updateBoard() {
  const cells = document.querySelectorAll('.cell');

  // Clear the board by removing text content and classes from all cells
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('last-move-cell');
  });

  // Flag to check if the lastFullMove cell has been highlighted
  let lastMoveCellHighlighted = false;

  // Iterate through all boards
  for (let boardIndex = 0; boardIndex < 9; boardIndex++) {
    const board = gameBoard[boardIndex];

    // If a winner is declared for this board, display the winner's symbol only on that board
    if (board.winner !== null && board.winner !== 'Draw') {
      // Iterate through the cells and set the winner's symbol in each cell
      board.cells.forEach((cell, cellIndex) => {
        const displayCell = cells[boardIndex * 9 + cellIndex];
        displayCell.textContent = board.winner;

        // Check if the current move is the lastFullMove and hasn't been highlighted yet
        if (!lastMoveCellHighlighted && boardIndex === lastFullMove[0] && cellIndex === lastFullMove[1]) {
          displayCell.classList.add('last-move-cell');
          lastMoveCellHighlighted = true; // Set the flag to true to avoid further highlighting
        }
      });
    } else {
      // Otherwise, update the board with player moves
      player1.moves.forEach(move => {
        if (move.boardIndex === boardIndex) {
          const cellIndex = move.cellIndex;
          const displayCell = cells[boardIndex * 9 + cellIndex];
          displayCell.textContent = player1.symbol;

          // Check if the current move is the lastFullMove and hasn't been highlighted yet
          if (!lastMoveCellHighlighted && boardIndex === lastFullMove[0] && cellIndex === lastFullMove[1]) {
            displayCell.classList.add('last-move-cell');
            lastMoveCellHighlighted = true; // Set the flag to true to avoid further highlighting
          }
        }
      });

      player2.moves.forEach(move => {
        if (move.boardIndex === boardIndex) {
          const cellIndex = move.cellIndex;
          const displayCell = cells[boardIndex * 9 + cellIndex];
          displayCell.textContent = player2.symbol;

          // Check if the current move is the lastFullMove and hasn't been highlighted yet
          if (!lastMoveCellHighlighted && boardIndex === lastFullMove[0] && cellIndex === lastFullMove[1]) {
            displayCell.classList.add('last-move-cell');
            lastMoveCellHighlighted = true; // Set the flag to true to avoid further highlighting
          }
        }
      });
    }
  }
}

  
// Function to display the result
function displayResult(result) {
  const resultDiv = document.getElementById('result');
  const winnerText = document.getElementById('winner-text');
  const restartButton = document.getElementById('restart-button');
  const statusText = document.getElementById('status'); // Get the status text element

  resultDiv.style.display = 'block';

  if (result === 'Draw') {
    winnerText.textContent = "It's a draw!";
  } else {
    winnerText.textContent = `${gameWinner} wins!`;
  }

  statusText.style.display = 'none';
  resultDiv.classList.remove('hidden');
}

// function to change to next player
function updateCurrentPlayer(boardIndex, cellIndex) {
  currentPlayer = (currentPlayer === player1) ? player2 : player1;
  document.getElementById('status').textContent = `${currentPlayer.name}'s turn`;
}

// Function to reset the game
function resetGame() {
  // Clear player moves and reset the board
  player1.moves = [];
  player1.boardWins = [];
  player2.moves = [];
  player2.boardWins = [];
  lastMove = null;
  lastFullMove = [];
  gameWinner = null;
  currentPlayer = player1;
  Object.keys(gameBoard).forEach(index => {
    gameBoard[index].cells = ['', '', '', '', '', '', '', '', ''];
    gameBoard[index].winner = null;
  });

  // Clear the result display and show the turn status
  const resultDiv = document.getElementById('result');
  const statusText = document.getElementById('status');
  const restartButton = document.getElementById('restart-button');
  statusText.style.display = 'block'; // Show the turn status
  resultDiv.style.display = 'none'

  // Update the visual board
  updateBoard();

  // Reset the status text to indicate the current player's turn
  statusText.textContent = `${currentPlayer.name}'s turn`;
  console.log(player1)
  console.log(player2)
  console.log(gameBoard)
  console.log(lastMove)
}