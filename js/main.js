const container = document.querySelector(".container");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const sections = [...document.querySelectorAll(".smile")];
const timerElement = document.querySelector(".timer");
let startTime;
let timerInterval;
let gameStarted = false;
let mistakeCount = 0;
const maxMistakes = 6;

const result = [
  "🍎", "🍌", "🍍", "🍉", "🍇", "🍓", "🍒", "🥥", "🥑",
  "🍎", "🍌", "🍍", "🍉", "🍇", "🍓", "🍒", "🥥", "🥑"
];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let mixedArr;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = `Time: ${elapsedTime}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function showGameOverMessage() {
  const gameOverMessage = document.createElement("div");
  gameOverMessage.textContent = "Game Over! You made too many mistakes.";
  gameOverMessage.style.position = "fixed";
  gameOverMessage.style.top = "50%";
  gameOverMessage.style.left = "50%";
  gameOverMessage.style.transform = "translate(-50%, -50%)";
  gameOverMessage.style.padding = "20px";
  gameOverMessage.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
  gameOverMessage.style.color = "white";
  gameOverMessage.style.fontSize = "24px";
  gameOverMessage.style.borderRadius = "10px";
  gameOverMessage.style.textAlign = "center";
  document.body.appendChild(gameOverMessage);
  
  setTimeout(() => {
    gameOverMessage.remove();
    resetGame();
  }, 3000);
}

function showWinMessage() {
  const winMessage = document.createElement("div");
  winMessage.textContent = "🎉 You Win! 🎉";
  winMessage.style.position = "fixed";
  winMessage.style.top = "50%";
  winMessage.style.left = "50%";
  winMessage.style.transform = "translate(-50%, -50%)";
  winMessage.style.padding = "20px";
  winMessage.style.backgroundColor = "rgba(0, 128, 0, 0.8)";
  winMessage.style.color = "white";
  winMessage.style.fontSize = "24px";
  winMessage.style.borderRadius = "10px";
  winMessage.style.textAlign = "center";
  document.body.appendChild(winMessage);
  
  setTimeout(() => {
    winMessage.remove();
    resetGame();
  }, 3000);
}

start.addEventListener("click", () => {
  gameStarted = true;
  mistakeCount = 0;
  mixedArr = shuffleArray(result);

  mixedArr.forEach((item, i) => {
    sections[i].textContent = item;
    sections[i].style.display = "block";
  });

  setTimeout(() => {
    sections.forEach(section => {
      section.style.display = "none";
    });
    startTimer();
  }, 3000);
});

container.addEventListener("click", onClick);
const myRes = [];
let isProcessing = false;

function onClick(event) {
  if (!gameStarted) return;

  if (event.target.classList.contains("main-section")) {
    if (isProcessing) return;

    event.target.firstChild.style.display = "block";
    myRes.push(event.target.firstChild);

    if (myRes.length === 2) {
      isProcessing = true;
      setTimeout(() => {
        if (myRes[0].textContent !== myRes[1].textContent) {
          myRes[0].style.display = "none";
          myRes[1].style.display = "none";
          mistakeCount++;
        }
        myRes.length = 0;
        isProcessing = false;

        if (mistakeCount >= maxMistakes) {
          showGameOverMessage();
        }
      }, 1000);
    }
  }

  if (document.querySelectorAll(".smile[style='display: block;']").length === result.length) {
    stopTimer();
    showWinMessage();
  }
}

reset.addEventListener("click", resetGame);

function resetGame() {
  gameStarted = false;
  mistakeCount = 0;
  mixedArr.forEach((_, i) => {
    sections[i].textContent = "";
    sections[i].style.display = "none";
  });
  stopTimer();
  timerElement.textContent = "Time: 0s";
}
