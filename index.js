console.log("javascript loaded successfully");                  // Log javascript linked

function submitAndStart () {                // Submit Form & Start Game
    handleSubmit(event);                    // Collect data from Name Form
    startGame();                            // Clear content and construct board
}

let playerOne;                              // Create player variable
let playerTwo;                              // Create player variable

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
    console.log("Game Started");                                                // Checker for function called
    let removeElement = document.getElementsByTagName("form");                  // Assign form to variable                                               // 
    removeElement[0].remove();                                                  // Remove form from page
    let body = document.getElementById("mainBody");                             // Assign page body to variable
    let newSubHeading = document.createElement("h2");                           // Create new h2
    newSubHeading.id = "winner";                                                // New h2 ID
    let newDiv = document.createElement("div");                                 // Create new div
    newDiv.id = "board";                                                        // New div ID
    let centerDiv = document.getElementById("center-div");                      // Assign center-div to variable
    centerDiv.appendChild(newDiv);                                              // Append new div to center-div
    centerDiv.insertBefore(newSubHeading, centerDiv.children[0]);               //
    let newButton = document.createElement("button");
    newButton.id = "reset";
    newButton.classList.add("button");
    newButton.innerHTML = "New Round";
    newButton.setAttribute('onclick', "resetBoard()");
    centerDiv.appendChild(newButton);

    board = [];                                                        // CONSTRUCT THE BOARD
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");

            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
    winner.innerText = `${playerOne.value} it's your turn`;
}

// BEGINNING OF GAME MECHANICS

function setPiece() {
    if (gameOver) {
        return;
    }

    //get coords of the tile which has been clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c];

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update game board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        let kipper = document.createElement("img");
        tile.appendChild(kipper);
        kipper.setAttribute("src", "/assets/images/icons/kipper-red-1.png");
        kipper.setAttribute("width", "100%");
        currPlayer = playerYellow;
        winner.innerText = `${playerTwo.value} it's your turn`;
    }
    else {
        tile.classList.add("yellow-piece");
        let porgie = document.createElement("img");
        tile.appendChild(porgie);
        porgie.setAttribute("src", "/assets/images/icons/porgie-yellow-1.png");
        porgie.setAttribute("width", "100%");
        currPlayer = playerRed;
        winner.innerText = `${playerOne.value} it's your turn`;
    }
    r -= 1; //update the row height for that column to continue simulating gravity and stacking
    currColumns[c] = r; //update the array
    checkWinner(); //search for win condition
}

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
function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = `${playerOne.value} & Kipper Win!`;
        ++playerRedScore;
        console.log("Player One Score = " + playerRedScore);
    } else {
        winner.innerText = `${playerTwo.value} & Porgie Win!`;
        ++playerYellowScore;
        console.log("Player Two Score = " + playerYellowScore);
    }
    gameOver = true;
}

// Function Removes The Existing Board
function resetBoard() {
    let deleteWinner = document.getElementById("winner");
    let deleteBoard = document.getElementById("board");
    deleteWinner.remove();
    deleteBoard.remove();
    console.log("Board Cleared");
    startNewGame();
    gameOver = false;
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
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
    winner.innerText = `${playerOne.value} it's your turn`;
}

// end of game mechanics