Trying to make a two player super tic tac toe game

rules
-2 players (player 'x' and player 'o')
-nine games of tic tac toe nested within a larger game of tic tac toe
-play on the smaller games
-whatever location a player puts a x or o in the smaller games dictates the region of the larger game that can be played in next
-smaller games are won by creating three characters in a row (x's or o's)
-once smaller game is won, that whole region of the larger game is marked as the character of the winning player
-if a player places a character in a region of a smaller game who's corrisponding larger region has already been won or drawn, the next player may play in any smaller game
-whole game is won once the larger game has three wins in a row by one of the players

implementation
-javascript
--start with all 81 locations available for play for player X (9 arrays of 9 locations)
--once x character is placed in location, run end of turn checks
---are there any win conditions met? (win condtions are as follows)
----small win - three in a row of same character in smaller arrays
-----if so mark that whole region as the character of the winning player and remove that region from play
----big win - three in a row of same character in larger array
-----if so end game with "player (x or o) wins!"
--if big win condition not met then initiate next turn
---change from player X character to player O character
---open smaller game array based on location of previous player's character for player O to place character
---check if new array has been removed from play
----if not, then only open play for that array
----if so then open all active arrays for play
--once o character is placed in location, run end of turn checks



