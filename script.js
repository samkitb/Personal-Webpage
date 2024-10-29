let playerCount;
let playerScores;
let currentPlayer;
let currentScore;
const maxScore = 50;

const diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function roll() {
    return Math.floor(Math.random() * 6) + 1;
}

function updateDisplay() {
    document.querySelectorAll('.player').forEach((playerEl, index) => {
        playerEl.classList.toggle('active-player', index === currentPlayer);
        playerEl.querySelector('.total-score').textContent = playerScores[index];
        playerEl.querySelector('.current-score').textContent = index === currentPlayer ? currentScore : 0;
    });
}

function createPlayerElements() {
    const playersContainer = document.getElementById('players-container');
    playersContainer.innerHTML = '';
    for (let i = 0; i < playerCount; i++) {
        const playerEl = document.createElement('div');
        playerEl.classList.add('player');
        playerEl.innerHTML = `
            <h2>Player ${i + 1}</h2>
            <p>Total: <span class="total-score">0</span></p>
            <p>Current: <span class="current-score">0</span></p>
        `;
        playersContainer.appendChild(playerEl);
    }
}

function startGame() {
    playerCount = parseInt(document.getElementById('player-count').value);
    
    // Validation to ensure player count is between 2 and 4
    if (playerCount < 2 || playerCount > 4) {
        alert("Please select between 2 and 4 players.");
        return; // Exit the function if the count is invalid
    }

    playerScores = new Array(playerCount).fill(0);
    currentPlayer = 0;
    currentScore = 0;
    document.getElementById('player-setup').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    createPlayerElements();
    updateDisplay();
}

function rollDice() {
    const diceEl = document.getElementById('dice');
    diceEl.classList.add('rolling');
    setTimeout(() => {
        const value = roll();
        diceEl.textContent = diceEmoji[value - 1];
        diceEl.classList.remove('rolling');
        document.getElementById('dice-result').textContent = `You rolled a ${value}`;
        
        if (value === 1) {
            // Reset the total score to zero if a 1 is rolled
            playerScores[currentPlayer] = 0; 
            currentScore = 0; // Reset current score
            updateDisplay(); // Update the display to reflect the change
            nextPlayer();
        } else {
            currentScore += value;
            updateDisplay();
        }
    }, 500);
}

function hold() {
    playerScores[currentPlayer] += currentScore;
    if (playerScores[currentPlayer] >= maxScore) {
        endGame();
    } else {
        nextPlayer();
    }
}

function nextPlayer() {
    currentScore = 0;
    currentPlayer = (currentPlayer + 1) % playerCount;
    updateDisplay();
}

function endGame() {
    const winnerIndex = playerScores.indexOf(Math.max(...playerScores));
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('winner').style.display = 'block';
    document.getElementById('winner').querySelector('p').textContent = `Player ${winnerIndex + 1} wins with a score of ${playerScores[winnerIndex]}!`;
}

function playAgain() {
    // Reset game variables
    playerScores = new Array(playerCount).fill(0); // Reset scores
    currentPlayer = 0;
    currentScore = 0;
    
    // Show the setup screen again
    document.getElementById('player-setup').style.display = 'block';
    document.getElementById('game-board').style.display = 'none';
    document.getElementById('winner').style.display = 'none';
    document.getElementById('player-count').value = 2; // Reset player count to default
    createPlayerElements(); // Recreate player elements
    updateDisplay(); // Update display
}

// New function to go back to the intro
function goBackToIntro() {
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('intro').style.display = 'block';
}

// Event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('roll').addEventListener('click', rollDice);
document.getElementById('hold').addEventListener('click', hold);
document.getElementById('play-again').addEventListener('click', playAgain);
document.getElementById('back-btn').addEventListener('click', goBackToIntro); // Back button listener
document.getElementById('start-game-btn').addEventListener('click', function() {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
});