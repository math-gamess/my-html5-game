const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;

let score = 0;
let lives = 3;
let balloons = [];
let currentQuestion;
let answer;
let balloonSpeed = 1.5;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion() {
    let a = randomInt(1, 10);
    let b = randomInt(1, 10);
    answer = a + b;
    currentQuestion = `${a} + ${b} = ?`;
    document.getElementById("question").innerText = currentQuestion;
}

function createBalloons() {
    balloons = [];
    let correctPos = randomInt(0, 4);
    for (let i = 0; i < 5; i++) {
        let num = i === correctPos ? answer : randomInt(2, 20);
        balloons.push({
            x: 50 + i * 80,
            y: -randomInt(20, 200),
            num: num,
            color: `hsl(${randomInt(0, 360)}, 70%, 50%)`
        });
    }
}

function drawBalloons() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balloons.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, 30, 0, Math.PI * 2);
        ctx.fillStyle = b.color;
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(b.num, b.x, b.y + 6);
    });
}

function updateBalloons() {
    balloons.forEach(b => b.y += balloonSpeed);
    if (balloons.some(b => b.y > canvas.height)) {
        lives--;
        if (lives <= 0) {
            alert("انتهت اللعبة! مجموع نقاطك: " + score);
            resetGame();
        } else {
            newRound();
        }
    }
}

function clickHandler(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;

    balloons.forEach(b => {
        let dx = mouseX - b.x;
        let dy = mouseY - b.y;
        if (Math.sqrt(dx * dx + dy * dy) < 30) {
            if (b.num === answer) {
                score++;
                newRound();
            } else {
                lives--;
                if (lives <= 0) {
                    alert("انتهت اللعبة! مجموع نقاطك: " + score);
                    resetGame();
                }
            }
        }
    });
}

function newRound() {
    generateQuestion();
    createBalloons();
    document.getElementById("score").innerText = `النقاط: ${score} | المحاولات: ${lives}`;
}

function resetGame() {
    score = 0;
    lives = 3;
    newRound();
}

canvas.addEventListener("click", clickHandler);

function gameLoop() {
    drawBalloons();
    updateBalloons();
    requestAnimationFrame(gameLoop);
}

newRound();
gameLoop();
