The Super Tic-Tac-Toe implimentation!!!

Still doin' the learnins with this duder! The goal with this one is to work on the following
1. Object Oriented Coding
    a. DONE! Move from Arrays to Objects (basically gonna rewrite the majority of the code from the simplettt for this)
        i. rewrote the code so each player is an object with an array of their moves as elements of the player object, moves.push to each array to keep track of moves.
2. State management
    a. DONE! Move from storing the game state as an array the players interact with, to two seperate arrays, one for each player's moves
        i. doin it like this now!
3. Scalability
    a. The simplettt implementation didn't scale when using it for a superttt game, so follow the same idea as last time (write code for a simplettt game first). But! Make sure not to overcomplicate the simple implementation so it scales this time.
        i. made sure to represent the board as cells each with a single number for each cell
        ii. Next I'm adding a second array as a label for each board (for keeping track of what board is open for play in the next super tictactoe move)

    Game Logic
    -two arrays for player moves, one for each player
    -check each array after a player move for win/draw conditions, then switch to the next player's turn.
