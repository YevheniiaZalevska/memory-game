const container = document.querySelector(".container");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const sections = [...document.querySelectorAll(".smile")];
const timerElement = document.querySelector(".timer");
let startTime;
let timerInterval;
let gameStarted = false;

const result = [
  "🍎", "🍌", "🍍", "🍉", "🍇", "🍓", "🍒", "🍑", "🥑",
  "🍎", "🍌", "🥑", "🍉", "🍇", "🍓", "🍒", "🍑", "🍍"
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

start.addEventListener("click", () => {
  gameStarted = true;
  hideCart();
  startTimer();
});

function hideCart() {
  mixedArr = shuffleArray(result);
  mixedArr.forEach((item, i) => {
    sections[i].textContent = item;
    sections[i].style.display = "none";
  });
}

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
        }
        myRes.length = 0;
        isProcessing = false;
      }, 1000);
    }
  }
  if (document.querySelectorAll(".smile[style='display: block;']").length === result.length) {
    stopTimer();
  }
}

reset.addEventListener("click", resetGame);

function resetGame() {
  gameStarted = false;
  mixedArr.forEach((_, i) => {
    sections[i].textContent = "";
    sections[i].style.display = "none";
  });
  stopTimer();
  timerElement.textContent = "Time: 0s";
}
