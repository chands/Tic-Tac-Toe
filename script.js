//const
const started = 1;
const ended = 0;
const game = {
    state: started,
    turn: 'X',
    moveCount: 0
}

//html elements
const playerspan = document.getElementById('player'); //get players turn written above 'X' or 'O'.
const gameTable = document.getElementById('game'); //get the table to get clicked row & col.
const cells = document.getElementsByTagName('td'); //get all cells in HTML collectionform.

//show message at the end of the game.
function endGame(winner) {
    if (winner) {
        alert("Game Over | Winner = " + winner);
    }
    else {
        alert("Game Over | It's a Draw!");
    }
    game.state = ended;
}

//check if pattern is matched with winning pattern.
function isPatternCaptured(arr) {
    let winningPattern = game.turn + game.turn + game.turn;
    if (arr.map(item => item.textContent).join('') == winningPattern) {
        endGame(game.turn);
    }
}

//check for complete row is captured or not.
function isRowFilled(row) {
    let tableRow = Array.from(gameTable.children[0].children[row - 1].children);
    isPatternCaptured(tableRow);
}

//check for complete column is captured or not.
function isColFilled(col) {
    let tableCol = [
        gameTable.children[0].children[0].children[col - 1],
        gameTable.children[0].children[1].children[col - 1],
        gameTable.children[0].children[2].children[col - 1]
    ];
    //since table is created rowwise, so can't access whole col at one go.
    isPatternCaptured(tableCol);
}

//check for diagonal cells is captured with same pattern or not.
function isDiagonalFilled(row, col) {
    if (row != col && (row + col) != 4) return;
    let arrDiag1 = [
        gameTable.children[0].children[0].children[0],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[2]
    ];
    let arrDiag2 = [
        gameTable.children[0].children[0].children[2],
        gameTable.children[0].children[1].children[1],
        gameTable.children[0].children[2].children[0]
    ];
    isPatternCaptured(arrDiag1);
    isPatternCaptured(arrDiag2);
}

//Restart the game.
function restartGame() {
    //clear the text of cells.
    Array.from(cells).forEach(cell => {
        cell.textContent = '';
    })
    //choose player randomely.
    if (Math.random() > 0.5) {
        game.turn = 'O';
    }
    else game.turn = 'X';
    //change few variables.
    game.state = started;
    game.moveCount = 0;
    playerspan.textContent = "";
}

//whose turn is going to be next?
function nextTurn() {
    game.moveCount++;
    console.log(game.moveCount);
    if (game.moveCount == 9) {
        alert("Game Over!");
        game.state = ended;
    }

    if (game.turn == 'X') game.turn = 'O';
    else game.turn = 'X';

    //change text content of player span.
    playerspan.textContent = game.turn;
    //change text color of "X" & "O" in playerspan
    if (game.turn == "X") {
        playerspan.style.color = "#00acee";
    }
    else {
        playerspan.style.color = "#c4302b";
    }
}

//Driver code | Get clicked cell of the game table
function playerClickedBox(row, col) {
    if (game.state == ended) {
        alert("Please Restart the Game to play again!");
        return;
    }

    let clickedBox = gameTable.children[0].children[row - 1].children[col - 1];

    if (clickedBox.textContent == 'O' || clickedBox.textContent == 'X') {
        alert("Invalid Move!");
    }//nextturn() & moveCount shouldn't run.
    else {
        console.log('box clicked =', row, col);
        //change the text content of cells.
        clickedBox.textContent = game.turn;
        //change text color of "X" & "O" in clicked box
        if (game.turn == "X") {
            clickedBox.style.color = "#00acee";
        }
        else {
            clickedBox.style.color = "#c4302b";
        }
        if (game.state == started) {
            isRowFilled(row);
        }
        if (game.state == started) {
            isColFilled(col);
        }
        if (game.state == started) {
            isDiagonalFilled(row, col);
        }
        nextTurn();
    }

}