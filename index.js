console.log("javascript loaded successfully");

// GLOBAL VARIABLES used in the game mechanics

var playerOne = "R";
var playerTwo = "Y";
var currPlayer = playerOne;

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var currColumns = [];

// This gets the form values and attaches them to Player Name variables and then clears the page and sets up the board
function submitAndStart () {
    handleSubmit(event);
    startGame();
}

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
}

// BEGINNING OF GAME MECHANICS

function setPiece() {
    if (gameOver) {
        return;
    }

    let coords = this.id.split("-"); 
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (currPlayer == playerOne) {
        tile.classList.add("red-piece");
        currPlayer = playerTwo;
    }
    else {
        tile.classList.add("yellow-piece");
        currPlayer = playerOne;
    }

    r -= 1; //updating row height for a column
    currColumns[c] = r; // update board array

    checkWinner();
}

function checkWinner() {
    // horizontal win check
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c< columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //vertical win check
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

    //anti diagonal win check
    for (let r = 0; r < rows-3; r++){
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // diagonal win check
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] !=' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerOne) {
        winner.innerText = `${playerOne.value} & Kipper Win!`;
    } else {
        winner.innerText = `${playerTwo.value} & Porgie Win!`;
    }

    gameOver = true;
}

// end of game mechanics