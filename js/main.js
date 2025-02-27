const container = document.querySelector(".container");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const sections = [...document.querySelectorAll(".smile")];
const test = document.querySelector("p");

const result = [
  "🍎",
  "🍌",
  "🍍",
  "🍉",
  "🍇",
  "🍓",
  "🍒",
  "🍑",
  "🥑",
  "🍎",
  "🍌",
  "🥑",
  "🍉",
  "🍇",
  "🍓",
  "🍒",
  "🍑",
  "🍍",
];

const arr = [];

for (let i = 0; i < 100; i++) {
  if (arr.length === 10) {
    break;
  }
  const res = Math.ceil((Math.random() * 100) % 10);
  if (arr.find((element) => element === res) === undefined) {
    arr.push(res);
  }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let mixedArr;

start.addEventListener("click", hideCart);

function hideCart() {
  mixedArr = shuffleArray(result);

  mixedArr.map((item, i) => {
    sections[i].textContent = item;
    sections[i].style.display = "none";
  });
}

container.addEventListener("click", onClick);
const myRes = [];
let i = 0;
let first;
let isProcessing = false;

function onClick(event) {
  if (event.target.classList.contains("main-section")) {
    if (isProcessing) {
      return;
    }
    event.target.firstChild.style.display = "block";

    myRes.push(event.target.firstChild);

    if (myRes.length === 2) {
      isProcessing = true;
      setTimeout(() => {
        if (myRes[0].textContent !== myRes[1].textContent) {
          myRes[0].style.display = "none";
          myRes[1].style.display = "none";

          i = 0;
          myRes.length = 0;
          isProcessing = false;
        } else {
          myRes.length = 0;
          isProcessing = false;
        }
      }, 1000);
    }
  }
  i += 1;
}

reset.addEventListener("click", resetGame);

function resetGame() {
  mixedArr.map((item, i) => {
    sections[i].textContent = "";
    sections[i].style.display = "none";
  });
}