const statusDisplay = document.querySelector('.status');
const scoreDisplay = document.querySelector('.score');

let gameActive = true;
// Define variables for storing player and computer score
let playerScore = 0;
let computerScore = 0;
// Randomly pick current player
let currentPlayer = Math.random() < 0.5 ? "X" : "O";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const scoreMessage = () => `Player: ${playerScore} Computer: ${computerScore}`;

statusDisplay.innerHTML = currentPlayerTurn();
console.log(currentPlayerTurn());
scoreDisplay.innerHTML = scoreMessage();

// If it is computer's turn, do computer's logic
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

// Function for computer automatically playing
function computerTurn() {
    if (!gameActive || currentPlayer === 'X') {
        return;
    }
    
    // Set delay
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

// Function that updates the scoreboard after each game
function updateScore(player) {
    if (player === 'X') {
        playerScore += 1;
    } else if (player === 'O') {
        computerScore += 1;
    }
    scoreDisplay.innerHTML = scoreMessage();
    console.log(scoreMessage());
}

// Function that handles the cell being played
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Changes cell to either X or O based on player currently playing
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    console.log(`${currentPlayer} played position ${clickedCellIndex}`);
}

// Function that handles the changing of players
function handlePlayerChange() {
    // If the current player is X then change it to O
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    console.log(currentPlayerTurn());

    // If it is computer's turn, do computer's logic
    computerTurn();
}

// Function that checks if game is won or not
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
        // Log that the player has won
        console.log(winningMessage());
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";

        // Highlight the cells that caused the win
        winIndexes.forEach(index => {
            document.querySelector(`.cell[data-cell-index="${index}"]`).style.backgroundColor = "rgb(251,100,204)";
        });

        updateScore(currentPlayer);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        // Log that there was a draw
        console.log(drawMessage());
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }

    handlePlayerChange();
}

// Function that handles clicking a cell
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    // Gets the index of the clicked cell from the 'data-cell-index' attribute
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Function that handles restarting the game
function handleRestartGame() {
    gameActive = true;
    // Randomly pick current player
    currentPlayer = Math.random() < 0.5 ? "X" : "O";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    // Reset cell colors to default
    document.querySelectorAll('.cell').forEach(cell => cell.style.backgroundColor = "");
    // Log that a new game has started
    console.log('New game started');
    // Log the current player's turn
    console.log(currentPlayerTurn());

    // If it is computer's turn, do computer's logic 
    computerTurn();
}

// Adds a click listener to each cell
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
// Adds a click listener to the new game button
document.querySelector('.restart').addEventListener('click', handleRestartGame);