const statusDisplay = document.querySelector('.status');
const scoreDisplay = document.querySelector('.score');

let gameActive = true;
let playerScore = 0;
let computerScore = 0;
let currentPlayer = Math.random() < 0.5 ? "X" : "O";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const scoreMessage = () => `Player: ${playerScore} Computer: ${computerScore}`;

statusDisplay.innerHTML = currentPlayerTurn();
console.log(currentPlayerTurn());
scoreDisplay.innerHTML = scoreMessage();

computerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function computerTurn() {
    if (!gameActive || currentPlayer === 'X') {
        return;
    }
    
    setTimeout(() => {
        let emptyCells = [];
        for (let i = 0; i < gameState.length; i++) {
            if (gameState[i] === "") {
                emptyCells.push(i);
            }
        }
        
        let randomIndex = Math.floor(Math.random() * emptyCells.length);
        let cellIndex = emptyCells[randomIndex];
        let clickedCell = document.querySelectorAll('.cell')[cellIndex];
        handleCellPlayed(clickedCell, cellIndex);
        handleResultValidation();
    }, 500);
}

function updateScore(player) {
    if (player === 'X') {
        playerScore += 1;
    } else if (player === 'O') {
        computerScore += 1;
    }
    scoreDisplay.innerHTML = scoreMessage();
    console.log(scoreMessage());
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    console.log(`${currentPlayer} played position ${clickedCellIndex}`);
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    console.log(currentPlayerTurn());

    computerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    let winIndexes;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winIndexes = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        console.log(winningMessage());
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";

        winIndexes.forEach(index => {
            document.querySelector(`.cell[data-cell-index="${index}"]`).style.backgroundColor = "rgb(251,100,204)";
        });

        updateScore(currentPlayer);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        console.log(drawMessage());
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.backgroundColor = "";
    });
    
    gameActive = true;
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    console.log('New game started');
    console.log(currentPlayerTurn());

    computerTurn();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);