// Game state
let playerScore = 0;
let computerScore = 0;

// Game choices
const choices = ["rock", "paper", "scissors"];

// Choice mappings
const choiceEmojis = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

const choiceNames = {
  rock: "Rock",
  paper: "Paper",
  scissors: "Scissors",
};

// Game logic - determines winner
function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return "tie";
  }

  const winConditions = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winConditions[playerChoice] === computerChoice ? "player" : "computer";
}

// Generate computer choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Update score display
function updateScores() {
  const playerScoreElements = document.querySelectorAll("#playerScore");
  const computerScoreElements = document.querySelectorAll("#computerScore");

  playerScoreElements.forEach((element) => {
    element.textContent = playerScore;
  });

  // Fix: There are two elements with id="playerScore" in the HTML,
  // the second one should be computerScore
  if (computerScoreElements.length === 0) {
    // If no computerScore elements found, use the second playerScore element
    const allScoreElements = document.querySelectorAll("#playerScore");
    if (allScoreElements.length > 1) {
      allScoreElements[1].textContent = computerScore;
    }
  } else {
    computerScoreElements.forEach((element) => {
      element.textContent = computerScore;
    });
  }
}

// Update game result display
function updateGameResult(playerChoice, computerChoice, winner) {
  const gameResultElement = document.getElementById("gameResult");
  const roundResultElement = document.getElementById("roundResult");
  const computerChoiceElement = document.getElementById("computerChoice");

  // Update round result with choices
  const playerEmoji = choiceEmojis[playerChoice];
  const computerEmoji = choiceEmojis[computerChoice];
  roundResultElement.textContent = `You: ${playerEmoji} vs Computer: ${computerEmoji}`;

  // Update computer choice message
  const computerChoiceName = choiceNames[computerChoice];
  computerChoiceElement.textContent = `Computer chose: ${computerChoiceName} ${computerEmoji}`;

  // Update game result with winner
  let resultText = "";
  switch (winner) {
    case "player":
      resultText = "🎉 You Win";
      break;
    case "computer":
      resultText = "🤖 Computer Wins";
      break;
    case "tie":
      resultText = "🤝 It's a Tie!";
      break;
  }

  gameResultElement.textContent = resultText;

  // Add some styling based on result
  gameResultElement.className = "result-text";
  if (winner === "player") {
    gameResultElement.style.color = "#22c55e"; // green
  } else if (winner === "computer") {
    gameResultElement.style.color = "#ef4444"; // red
  } else {
    gameResultElement.style.color = "#6b7280"; // gray
  }
}

// Play a round
function playRound(playerChoice) {
  const computerChoice = getComputerChoice();
  const winner = determineWinner(playerChoice, computerChoice);

  // Update scores
  if (winner === "player") {
    playerScore++;
  } else if (winner === "computer") {
    computerScore++;
  }

  // Update UI
  updateScores();
  updateGameResult(playerChoice, computerChoice, winner);

  console.log(
    `Player: ${playerChoice}, Computer: ${computerChoice}, Winner: ${winner}`
  );
}

// Reset game
function resetGame() {
  playerScore = 0;
  computerScore = 0;

  updateScores();

  // Clear result displays
  const gameResultElement = document.getElementById("gameResult");
  const roundResultElement = document.getElementById("roundResult");
  const computerChoiceElement = document.getElementById("computerChoice");

  gameResultElement.textContent = "";
  roundResultElement.textContent = "";
  computerChoiceElement.textContent = "";

  console.log("Game reset");
}

// Initialize game when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add click listeners to choice buttons
  const choiceButtons = document.querySelectorAll(".btn[data-choice]");
  choiceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const choice = this.getAttribute("data-choice").toLowerCase();
      playRound(choice);
    });
  });

  const allButtons = document.querySelectorAll(".btn");
  allButtons.forEach((button, index) => {
    if (!button.hasAttribute("data-choice")) {
      button.addEventListener("click", () => {
        const choices = ["rock", "paper", "scissors"];
        if (index < choices.length) {
          playRound(choices[index]);
        }
      });
    }
  });

  // Add click listener to reset button
  const resetButton = document.querySelector(".reset-btn");
  if (resetButton) {
    resetButton.addEventListener("click", resetGame);
  }

  // Initialize scores
  updateScores();
});
