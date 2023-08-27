console.log("javascript loaded successfully");

// This gets the form values and attaches them to Player Name variables and then clears the page and sets up the board
function submitAndStart () {
    handleSubmit(event);
    startGame();
}

let playerOne;
let playerTwo;

function handleSubmit(event) {
    // Prevent the default submit action
    event.preventDefault();

    // Get the two input elements
    playerOne = document.getElementById('player1Name');
    playerTwo = document.getElementById('player2Name');

    // Log their values to the console for checking
    console.log('Player One:', playerOne.value);
    console.log('Player Two:', playerTwo.value);
}

// Constructs the board

// GLOBAL VARIABLES used in the game mechanics

var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

function startGame() {

    console.log("Game Started");
    let removeElement = document.getElementsByTagName("form");
    console.log(removeElement);
    removeElement[0].remove();

    let body = document.getElementById("mainBody");
    let newSubHeading = document.createElement("h2");
    newSubHeading.id = "winner";
    body.appendChild(newSubHeading);

    let newDiv = document.createElement("div");
    newDiv.id = "board";
    body.appendChild(newDiv);

    board = [];
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

    //get coords of that tile clicked
    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    // figure out which row the current column should be on
    r = currColumns[c];

    if (r < 0) { // board[r][c] != ' '
        return;
    }

    board[r][c] = currPlayer; //update JS board
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
        winner.innerText = `${playerTwo.value} it's your turn`;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
        winner.innerText = `${playerOne.value} it's your turn`;
    }

    r -= 1; //update the row height for that column
    currColumns[c] = r; //update the array

    checkWinner();
}

function checkWinner() {
    // horizontal
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

    // vertical
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

    // anti diagonal
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

    // diagonal
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

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = `${playerOne.value} & Kipper Win!`;
    } else {
        winner.innerText = `${playerTwo.value} & Porgie Win!`;
    }

    gameOver = true;
}

// end of game mechanics