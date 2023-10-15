    // Initialize the game board as an array of three arrays (the rows of the game)
    // Function to create a new copy of a board
    function createNewBoard() {
      return [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    }
    
    // Create a 3x3 array of individual boards
    const superBoard = [
      [createNewBoard(), createNewBoard(), createNewBoard()],
      [createNewBoard(), createNewBoard(), createNewBoard()],
      [createNewBoard(), createNewBoard(), createNewBoard()]
    ];

    // game starts with player X
    let currentPlayer = 'X';
    // game starts as active game
    let isGameOver = false;

    // Function to handle a player's move
    function makeMove(row, col) {
      // checks if game is over and spot player is attempting to play is empty
      if (!isGameOver && board[row][col] === '') {
        // allows for current player to place their character in empty spot
        board[row][col] = currentPlayer;
        // checks if game is over after player places character
        checkSmallGameOver();
        // updates visual of board to reflect new array state
        updateBoard();
        // Log the move with player and cell index
        console.log(`Player ${currentPlayer} moved in cell ${row * 3 + col}`);
        // changes input from player X to player O
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // updates display to say who's turn it is now
        document.getElementById('status').textContent = "Player " + currentPlayer + "'s turn";

      }
    }

    // Function to update the visual board (make the board we see look like the internal array that actually contains info)
    function updateBoard() {
      
      // access the .html file and .css file for attributes listed in '.cell' and apply to the constant 'cells'
      const cells = document.querySelectorAll('.cell');
      // use the 'forEach' method to iterate over all cells in the game board
      cells.forEach((cell, index) => {
        //these next two lines apply a single number to each cell in the grid
        //the row code parses out what row the cell is, and the col code parses out the column it's in
        const row = Math.floor(index / 3);
        const col = index % 3;
        // then, updates the cell contents with the board array contents, linking them through the index to row/col of the board array
        cell.textContent = board[row][col];
      });
    }

    // Function to check if the game is over
    function checkSmallGameOver() {
      // Check rows, columns, and diagonals for a win
      for (let i = 0; i < 3; i++) {
        // this is responsible for checking the 3 win conditions of the rows and display winner
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
          isGameOver = true;
          displayResult(board[i][0]); // Display the winner
          return;
        }
        // this is responsible for checking the 3 win conditions of the columns and display winner
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
          isGameOver = true;
          displayResult(board[0][i]); // Display the winner
          return;
        }
      }
      // this is responsible for checking the diagonal win condition from top left to bottom right and display winner
      if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        isGameOver = true;
        displayResult(board[0][0]); // Display the winner
        return;
      }
      // this is responsible for checking the diagonal win condition from top right to bottom left and display winner
      if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        isGameOver = true;
        displayResult(board[0][2]); // Display the winner
        return;
      }
    
      // Check for a tie by flattening the array (converting to new 1 dimensional array of just characters in original array)
        // because the isGameOver variable starts as false, we need to check if the flatten array does NOT contain any empty strings ('' duders)
        // if it does, then this does nothing. If it does NOT, then we change the isGameOver variable to true and display the result 'Tie'
      if (!board.flat().includes('')) {
        isGameOver = true;
        displayResult('Tie'); // Display a tie
      }
    }

// Function to display the result at the end of the game
// Here 'winner' is used as the argument, but this is used for internal code of displayResults function
// The actual input for the displayResults function comes from the checkGameOver function,
// Which feeds in 'X' 'O' or 'Tie' as input into the displayResults function
function displayResult(winner) {
    // resultDiv referenced in order to remove the 'hidden' attribute for the html result element
    const resultDiv = document.getElementById('result');
    // allows for modification of 'winner-text' element in html
    const winnerText = document.getElementById('winner-text');
    // allows the status text to be hidden at end of game
    const statusText = document.getElementById('status'); // Get the status text element
  
    // modify the html winner-text to display the results for a tie
    if (winner === 'Tie') {
      winnerText.textContent = "It's a tie!";
    // Or, modify the winner-text to display who's won if someone's won
    } else {
      winnerText.textContent = `Player ${winner} wins!`;
    }
  
    // Here's the code to unhide the results element in the html file
    resultDiv.classList.remove('hidden');
    
    // Hide the turn status when the game is over
    statusText.style.display = 'none';
  }
  
// Function to restart the game
function restartGame() {
    // the iterative code that lists each element of the 2D 3x3 array
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Replace all the values in the array with an empty character string
        board[i][j] = '';
      }
    }
    // Reset the game status to not over
    isGameOver = false;
    // Reset the current player to the 'X' player
    currentPlayer = 'X';
  
    // Hide the result message
    const resultDiv = document.getElementById('result');
    resultDiv.classList.add('hidden');
  
    // Clear the cells on the display board
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.textContent = '';
    });
  
    // Show the turn status again
    const statusText = document.getElementById('status');
    statusText.style.display = 'block'; // Display the status text
    statusText.textContent = "Player " + currentPlayer + "'s turn";
  }