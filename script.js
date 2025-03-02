document.addEventListener('DOMContentLoaded', () => {
    const rock = document.getElementById('rock');
    const paper = document.getElementById('paper');
    const scissors = document.getElementById('scissors');
    const playerScoreDisplay = document.getElementById('player-score');
    const computerScoreDisplay = document.getElementById('computer-score');
    const resultMessage = document.getElementById('result-message');
    const playerSelectionDisplay = document.getElementById('player-selection');
    const computerSelectionDisplay = document.getElementById('computer-selection');
    const replayButton = document.getElementById('replay');
    const winsDisplay = document.getElementById('wins');
    const lossesDisplay = document.getElementById('losses');
    const tiesDisplay = document.getElementById('ties');
    const bestOf3Button = document.getElementById('bestOf3');
    const bestOf5Button = document.getElementById('bestOf5');
    const gameArea = document.querySelector('.game-area');
    const roundsSelection = document.querySelector('.rounds-selection');

    let playerScore = 0;
    let computerScore = 0;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let roundsToWin = 0;

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function playRound(playerChoice, computerChoice) {
        playerSelectionDisplay.innerHTML = `<img src="${playerChoice}.png" alt="${playerChoice}">`;
        computerSelectionDisplay.innerHTML = `<img src="${computerChoice}.png" alt="${computerChoice}">`;

        if (playerChoice === computerChoice) {
            ties++;
            tiesDisplay.textContent = ties;
            return "It's a tie!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            playerScore++;
            playerScoreDisplay.textContent = playerScore;
            wins++;
            winsDisplay.textContent = wins;
            return 'You win!';
        } else {
            computerScore++;
            computerScoreDisplay.textContent = computerScore;
            losses++;
            lossesDisplay.textContent = losses;
            return 'You lose!';
        }
    }

    function updateResultMessage(message) {
        resultMessage.textContent = message;
        resultMessage.classList.add('show');
        setTimeout(() => {
            resultMessage.classList.remove('show');
        }, 6000);
    }

    function endGame() {
        if (playerScore >= roundsToWin) {
            updateResultMessage('Game over! You won the game!');
        } else {
            updateResultMessage('Game over! You lost the game!');
        }
        rock.disabled = true;
        paper.disabled = true;
        scissors.disabled = true;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreDisplay.textContent = playerScore;
        computerScoreDisplay.textContent = computerScore;
        playerSelectionDisplay.innerHTML = '';
        computerSelectionDisplay.innerHTML = '';
        rock.disabled = false;
        paper.disabled = false;
        scissors.disabled = false;
        resultMessage.textContent = '';
        resultMessage.classList.remove('show');
    }

    function startGame(rounds) {
        roundsToWin = rounds;
        roundsSelection.style.display = 'none';
        gameArea.style.display = 'block';
        resetGame();
    }

    bestOf3Button.addEventListener('click', () => {
        startGame(2);
    });

    bestOf5Button.addEventListener('click', () => {
        startGame(3);
    });

    rock.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        updateResultMessage(playRound('rock', computerChoice));
        if (playerScore >= roundsToWin || computerScore >= roundsToWin) {
            endGame();
        }
        rock.classList.add('bounce');
        setTimeout(() => {rock.classList.remove('bounce')}, 800)
    });

    paper.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        updateResultMessage(playRound('paper', computerChoice));
        if (playerScore >= roundsToWin || computerScore >= roundsToWin) {
            endGame();
        }
        paper.classList.add('bounce');
        setTimeout(() => {paper.classList.remove('bounce')}, 800)
    });

    scissors.addEventListener('click', () => {
        const computerChoice = getComputerChoice();
        updateResultMessage(playRound('scissors', computerChoice));
        if (playerScore >= roundsToWin || computerScore >= roundsToWin) {
            endGame();
        }
        scissors.classList.add('bounce');
        setTimeout(() => {scissors.classList.remove('bounce')}, 800)
    });

    replayButton.addEventListener('click', () => {
        roundsSelection.style.display = 'flex';
        gameArea.style.display = 'none';
    });
});