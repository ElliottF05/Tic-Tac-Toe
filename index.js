const possibleCombinations = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8],
    [0, 4, 8], 
    [2, 4, 6]  
];

const cells = document.getElementsByClassName("cell")

let playerXcells = [];
let playerOcells = [];
let cellsClicked = [];

let turn = 'X'
let running = true;

const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');


for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
        cellOnClick(i);
    })
    cells[i].addEventListener("mouseover", function() {
        cellMouseOver(i);
    })
    cells[i].addEventListener("mouseout", function() {
        cellMouseOff(i);
    })
}

resetBtn.addEventListener('click', resetBtnOnClick);


function cellOnClick(i) {

    if (running == false) {
        return;
    }
    if (cellsClicked.includes(i)) {
        return;
    }

    cellsClicked.push(i);
    cells[i].innerHTML = turn;
    cells[i].style.color = 'black';
    if (turn == 'X') {
        playerXcells.push(i)
    } else {
        playerOcells.push(i)
    }

    checkGameOver();

    if (turn == 'X') {
        turn = 'O';
    } else {
        turn = 'X';
    }
}


function checkGameOver() {

    for (combination of possibleCombinations) {

        let containsAll = true;

        for (pos of combination) {

            if (turn == 'X') {
                if (!playerXcells.includes(pos)) {
                    containsAll = false;
                    break;
                }
            }
            if (turn == 'O') {
                if (!playerOcells.includes(pos)) {
                    containsAll = false;
                    break;
                }
            }

        }

        if (containsAll) {
            for (pos of combination) {
                cells[pos].style.backgroundColor = 'yellow';
            }
            if (turn == 'X') {
                gameStatus.innerHTML = 'Player X wins!';
            } else {
                gameStatus.innerHTML = 'Player O wins!';
            }
            resetBtn.style.visibility = 'visible';
            running = false;
            return;
        }
    }

    if (cellsClicked.length == 9) {
        gameStatus.innerHTML = 'Game is a tie!';
        resetBtn.style.visibility = 'visible';
        running = false;
    }
}


function resetBtnOnClick() {
    cellsClicked = []
    playerOcells = []
    playerXcells = []
    for (let i = 0; i < 9; i++) {
        cells[i].innerHTML = '';
        cells[i].style.backgroundColor = 'lightgrey';
    }
    resetBtn.style.visibility = 'hidden';
    gameStatus.innerHTML = '';
    running = true;
}


function cellMouseOver(i) {

    console.log('mouse over');

    if (running == false) {
        return;
    }
    if (cellsClicked.includes(i)) {
        return;
    }

    cells[i].innerHTML = turn;
    cells[i].style.color = 'gray';

}


function cellMouseOff(i) {

    if (running == false) {
        return;
    }
    if (cellsClicked.includes(i)) {
        return;
    }

    cells[i].innerHTML = '';
    cells[i].style.color = 'black';

}