let correctAnswer;

// Start Game
function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game").style.display = "block";
  generateQuestion();
}

// Generate Random Math Question
function generateQuestion() {
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  correctAnswer = num1 + num2;
  document.getElementById("question").textContent = `What is ${num1} + ${num2}?`;
}

// Check Answer
function checkAnswer() {
  let userAnswer = parseInt(document.getElementById("answer").value);
  if (userAnswer === correctAnswer) {
    showWinScreen();
  } else {
    showLoseScreen();
  }
}

// Show Win Screen
function showWinScreen() {
  document.getElementById("game").style.display = "none";
  document.getElementById("win-screen").style.display = "block";
}

// Show Lose Screen
function showLoseScreen() {
  document.getElementById("game").style.display = "none";
  document.getElementById("lose-screen").style.display = "block";
}

// Restart Game
function restartGame() {
  document.getElementById("win-screen").style.display = "none";
  document.getElementById("lose-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  document.getElementById("answer").value = "";
}
