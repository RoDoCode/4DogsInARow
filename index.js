console.log("javascript loaded successfully");                  // Log javascript linked

function submitAndStart() {                // Submit Form & Start Game
    handleSubmit(event);                    // Collect data from Name Form
    startGame();                            // Clear content and construct board
}

let playerOne = "Player One";                              // Create player variable
let playerTwo = "Player Two";                              // Create player variable

function handleSubmit(event) {                                      // Collect data from Name Form
    event.preventDefault();                                         // Prevent the default submit action
    playerOne = document.getElementById('player1Name');             // Collect value of player name
    playerTwo = document.getElementById('player2Name');             // Collect value of player name
    console.log('Player One:', playerOne.value);                    // Log player name to console
    console.log('Player Two:', playerTwo.value);                    // Log player name to console
}

// GLOBAL VARIABLES
var playerRed = "R";                    // Player One also Player Red
var playerYellow = "Y";                 // Player Two also Player Yellow
var currPlayer = playerRed;             // Variable concerned with turn taking
var gameOver = false;                   // End game variable - also pause play
var board;                              // Container for the board
var rows = 6;                           // Number of rows on board
var columns = 7;                        // Number of columns on board
var currColumns = [];                   // Active current columns
var playerRedScore = 0;                 // Player One score variable
var playerYellowScore = 0;              // Player Two score variable

function startGame() {                  // FUNCTION - START THE GAME
    console.log("Game Started");                                            // Checker for function called
    let removeElement = document.getElementsByTagName("form");              // Assign form to variable
    removeElement[0].remove();                                              // Remove form from page
    let body = document.getElementById("mainBody");                         // Assign page body to variable
    let newSubHeading = document.createElement("h2");                       // Create new h2
    newSubHeading.id = "winner";                                            // New h2 ID
    let newDiv = document.createElement("div");                             // Create new div
    newDiv.id = "board";                                                    // New div ID
    let centerDiv = document.getElementById("center-div");                  // Assign center-div to variable
    centerDiv.appendChild(newDiv);                                          // Append new div to center-div
    centerDiv.insertBefore(newSubHeading, centerDiv.children[0]);           // Add new h2 before other elements in center-div
    let newButton = document.createElement("button");                       // Create new button
    newButton.id = "reset";                                                 // New button ID
    newButton.classList.add("button");                                      // Add button class to new button
    newButton.innerHTML = "New Round";                                      // Add text to new button
    newButton.setAttribute('onclick', "resetBoard()");                      // Set onclick attribute of new button
    newButton.style.marginTop = "2vh";                                      // Set new button margin top
    centerDiv.appendChild(newButton);                                       // Append new button to center-div
    let rightDiv = document.getElementById("right-div");                    // Assign variable for right-div
    let leftDiv = document.getElementById("left-div");                      // Assign variable for left-div
    let scoreCardOne = document.createElement("h2");                        // Create heading for player 1
    let scoreCardTwo = document.createElement("h2");                        // Create heading for player 2
    scoreCardOne.classList.add("score");                                    // Add class to score
    scoreCardTwo.classList.add("score");                                    // Add class to score
    scoreCardOne.innerHTML = `Player One <br> Score: ${playerRedScore}`;         // Add score text for score tracker
    scoreCardTwo.innerHTML = `Player Two <br> Score: ${playerYellowScore}`;      // Add score text for score tracker
    leftDiv.insertBefore(scoreCardOne, leftDiv.children[0]);                // Insert at start of left-div
    rightDiv.insertBefore(scoreCardTwo, rightDiv.children[0]);              // Insert at start of right-div

    // CONSTRUCT THE BOARD
    board = [];                                                             // Assign the board an empty array
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < rows; r++) {                                        // Loop for each row
        let row = [];                                                       // Assign an empty array to row
        for (let c = 0; c < columns; c++) {                                 // Loop for each column
            row.push(' ');                                                  // Push an empty string into each row for each column
            let tile = document.createElement("div");                       // Create a new div called Tile
            tile.id = r.toString() + "-" + c.toString();                    // Assign the tile ID to show the coordinate of itself, row and column
            tile.classList.add("tile");                                     // Add tile class to each tile
            tile.addEventListener("click", setPiece);                       // Event listener for click to set a piece
            document.getElementById("board").append(tile);                  // Append each tile to the board
        }
        board.push(row);                                                    // Push each row to the board
    }
    winner.innerText = `${playerOne.value} it's your turn`;                 // Start the turn-label text

}

// BEGINNING OF GAME MECHANICS
function setPiece() {                           // Setting a piece on the board
    if (gameOver) {                             // If game is over return and do not action the rest of setPiece function
        return;
    }
    let coords = this.id.split("-");            // Get coords of the tile which has been clicked
    let r = parseInt(coords[0]);                // Get row coordinate
    let c = parseInt(coords[1]);                // Get column coordinate
    r = currColumns[c];                         // Figure out which row the current column should be on
    if (r < 0) {                                // board[r][c] != ' '
        return;
    }
    board[r][c] = currPlayer;                                                   // Update game board
    let tile = document.getElementById(r.toString() + "-" + c.toString());      // Assign tile variable selected by ID coordinated
    if (currPlayer == playerRed) {                                              // IF statement for RED turn
        tile.classList.add("red-piece");                                        // Add red piece to selected tile class list
        let kipper = document.createElement("img");                             // Create new img element
        tile.appendChild(kipper);                                               // Append image token
        kipper.setAttribute("src", "/assets/images/icons/kipper-red-1.png");    // Set image token source attribute
        kipper.setAttribute("width", "100%");                                   // Set image token width attribute
        currPlayer = playerYellow;                                              // Change to next player
        winner.innerText = `${playerTwo.value} it's your turn`;                 // Change turn message text
    }
    else {                                                                      // ELSE statement for YELLOW turn
        tile.classList.add("yellow-piece");                                     // Add yellow piece to selected tile class list
        let porgie = document.createElement("img");                             // Create new img element
        tile.appendChild(porgie);                                               // Append image token
        porgie.setAttribute("src", "/assets/images/icons/porgie-yellow-1.png"); // Set image token source attribute
        porgie.setAttribute("width", "100%");                                   // Set image token width attribute
        currPlayer = playerRed;                                                 // Change to next player
        winner.innerText = `${playerOne.value} it's your turn`;                 // Change turn message text
    }
    r -= 1;                     //update the row height for that column to simulate gravity and stacking
    currColumns[c] = r;         //update the array
    checkWinner();              //search for win condition
}

// CHECK FOR WIN
function checkWinner() {
    // HORIZONTAL - loop checks for sets of 4 matching tiles with a sliding frame across the whole board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // VERTICAL - loop checks for sets of 4 matching tiles with a sliding frame across the whole board
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // ANTIDIAGONAL - loop checks for sets of 4 matching tiles within the range of available spaces for this to occur in the anti-diagonal direction
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // DIAGONAL - loop checks for sets of 4 matching tiles within the range of available spaces for this to occur in the diagonal direction
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

// Function Assigns The Winner and Declares It - Pausing any further play until a new round is set
function setWinner(r, c) {                                          // Function set by win condition met
    let winner = document.getElementById("winner");                 // Assign winner to variable
    if (board[r][c] == playerRed) {                                 // IF red wins
        winner.innerText = `${playerOne.value} & Kipper Win!`;      // Displays WINNER MESSAGE
        ++playerRedScore;                                           // Add one to the red score
        console.log("Player One Score = " + playerRedScore);        // Console log player new score
        updateScore();
    } else {                                                        // Else yellow wins
        winner.innerText = `${playerTwo.value} & Porgie Win!`;      // Displays WINNER MESSAGE
        ++playerYellowScore;                                        // Add one to the yellow score
        console.log("Player Two Score = " + playerYellowScore);     // Console log player new score
        updateScore();
    }
    gameOver = true;                                                // GAME OVER or paused until new round
}

function updateScore() {
    let removeScore = document.getElementsByClassName("score");             // Assign form to variable
    removeScore[1].remove();                                                // Remove form from page    
    removeScore[0].remove();                                                // Remove form from page
    let rightDiv = document.getElementById("right-div");                    // Assign variable for right-div
    let leftDiv = document.getElementById("left-div");                      // Assign variable for left-div
    let scoreCardOne = document.createElement("h2");                        // Create heading for player 1
    let scoreCardTwo = document.createElement("h2");                        // Create heading for player 2
    scoreCardOne.classList.add("score");                                    // Add class to score
    scoreCardTwo.classList.add("score");                                    // Add class to score
    scoreCardOne.innerHTML = `Player One <br> Score: ${playerRedScore}`;         // Add score text for score tracker
    scoreCardTwo.innerHTML = `Player Two <br> Score: ${playerYellowScore}`;      // Add score text for score tracker
    leftDiv.insertBefore(scoreCardOne, leftDiv.children[0]);                // Insert at start of left-div
    rightDiv.insertBefore(scoreCardTwo, rightDiv.children[0]);              // Insert at start of right-div
}

// Function Removes The Existing Board
function resetBoard() {                                         // 
    let deleteWinner = document.getElementById("winner");       //
    let deleteBoard = document.getElementById("board");         //
    deleteWinner.remove();                                      //
    deleteBoard.remove();                                       //
    console.log("Board Cleared");                               //
    startNewGame();                                             //
    gameOver = false;                                           // NEW ROUND DECLARED
}

// Function Constructs A Fresh Board
function startNewGame() {
    console.log("New Game Started");                    //for checking
    let body = document.getElementById("mainBody");     //assign variable to mainBody id
    let newSubHeading = document.createElement("h2");   //assign variable to newly created heading
    newSubHeading.id = "winner";                        //assign id to new heading
    let newDiv = document.createElement("div");         //assign variable to newly created div
    newDiv.id = "board";                                //assign id to new div
    let centerDiv = document.getElementById("center-div");           //assign variable to center-div id
    centerDiv.insertBefore(newDiv, centerDiv.children[0]);           //add new div to center-div before all other children in center-div
    centerDiv.insertBefore(newSubHeading, centerDiv.children[0]);    //add new subheading before all other children in center-div
    board = [];                                                      //assign an empty array to board empty variable
    currColumns = [5, 5, 5, 5, 5, 5, 5];
    for (let r = 0; r < rows; r++) {                                 // Loop for each row
        let row = [];                                                // Assign an empty array to row
        for (let c = 0; c < columns; c++) {                          // Loop for each column
            row.push(' ');                                           // Push an empty string into each row for each column
            let tile = document.createElement("div");                // Create a new div called Tile
            tile.id = r.toString() + "-" + c.toString();             // Assign the tile ID to show the coordinate of itself, row and column
            tile.classList.add("tile");                              // Add tile class to each tile
            tile.addEventListener("click", setPiece);                // Event listener for click to set a piece
            document.getElementById("board").append(tile);           // Append each tile to the board
        }
        board.push(row);                                             // Push each row to the board
    }
    winner.innerText = `${playerOne.value} it's your turn`;          // Start the turn-label text
}

// END OF GAME MECHANICS