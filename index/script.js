const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const endScreen = document.getElementById("end-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const questionEl = document.getElementById("question");
const scoreEl = document.getElementById("score");
const endMessage = document.getElementById("end-message");
const finalScore = document.getElementById("final-score");

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let balloons = [];
let score = 0;
let question, correctAnswer;
let gameInterval;
let playing = false;

// 🎈 Balloon class
class Balloon {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.radius = 30;
    this.speed = 2 + Math.random() * 2;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "skyblue";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.fillText(this.value, this.x - 10, this.y + 5);
  }

  update() {
    this.y += this.speed;
  }
}

// 🎮 Start game
function startGame() {
  startScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  endScreen.classList.add("hidden");

  score = 0;
  scoreEl.textContent = "Score: " + score;
  playing = true;

  nextQuestion();

  gameInterval = setInterval(gameLoop, 30);
}

// 🔄 Restart game
function restartGame() {
  endScreen.classList.add("hidden");
  startGame();
}

// ❓ Generate a new math question
function nextQuestion() {
  balloons = [];
  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  correctAnswer = a + b;
  question = `What is ${a} + ${b}?`;
  questionEl.textContent = question;

  let answers = [correctAnswer];
  while (answers.length < 3) {
    let wrong = Math.floor(Math.random() * 20) + 1;
    if (!answers.includes(wrong)) answers.push(wrong);
  }

  answers.sort(() => Math.random() - 0.5);

  for (let i = 0; i < answers.length; i++) {
    let x = 100 + i * 200;
    let y = 50;
    balloons.push(new Balloon(x, y, answers[i]));
  }
}

// 🖱 Click detection
canvas.addEventListener("click", (e) => {
  if (!playing) return;
  const rect = canvas.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;

  for (let i = 0; i < balloons.length; i++) {
    let b = balloons[i];
    let dx = clickX - b.x;
    let dy = clickY - b.y;
    if (Math.sqrt(dx * dx + dy * dy) < b.radius) {
      if (b.value === correctAnswer) {
        score++;
        scoreEl.textContent = "Score: " + score;
        alert("🎉 Great job! Correct answer!");
        nextQuestion();
      } else {
        endGame("❌ Oops! Wrong answer.");
      }
    }
  }
});

// 🎮 Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balloons.forEach((b) => {
    b.update();
    b.draw();
    if (b.y > canvas.height) {
      if (b.value === correctAnswer) {
        endGame("❌ You missed the correct balloon!");
      }
    }
  });
}

// 🏁 End game
function endGame(message) {
  clearInterval(gameInterval);
  playing = false;
  gameScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  endMessage.textContent = message;
  finalScore.textContent = `Your final score: ${score}`;
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

