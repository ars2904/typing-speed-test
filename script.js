const passageEl = document.getElementById("passage");
const difficultySelect = document.getElementById("difficulty");
const modeSelect = document.getElementById("mode");
const restartBtn = document.getElementById("restart");

const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

let passages = {};
let currentPassage = "";
let currentIndex = 0;

let timer = null;
let time = 0;
let started = false;

let correctChars = 0;
let incorrectChars = 0;
let totalTyped = 0;

fetch("data.json")
  .then(res => res.json())
  .then(data => {
    passages = data;
    loadPassage();
  });

function loadPassage() {
  const difficulty = difficultySelect.value;
  const list = passages[difficulty];

  currentPassage = list[Math.floor(Math.random() * list.length)];
  passageEl.innerHTML = "";
  currentIndex = 0;

  resetStats();

  currentPassage.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.innerText = char;

    if (index === 0) {
      span.classList.add("current");
    }

    passageEl.appendChild(span);
  });

  passageEl.focus();
}

function resetStats() {
  clearInterval(timer);
  time = 0;
  started = false;
  correctChars = 0;
  incorrectChars = 0;
  totalTyped = 0;

  timeEl.innerText = 0;
  wpmEl.innerText = 0;
  accuracyEl.innerText = 100;
}

function startTimer() {
  if (started) return;

  started = true;

  timer = setInterval(() => {
    time++;
    timeEl.innerText = time;

    if (modeSelect.value === "timed" && time >= 60) {
      endTest();
    }

    updateStats();
  }, 1000);
}

function updateStats() {
  const minutes = time / 60 || 1 / 60;
  const wpm = Math.round((correctChars / 5) / minutes);
  const accuracy = totalTyped
    ? Math.round((correctChars / totalTyped) * 100)
    : 100;

  wpmEl.innerText = wpm;
  accuracyEl.innerText = accuracy;
}

function handleTyping(e) {
  startTimer();

  const spans = passageEl.querySelectorAll("span");

  if (e.key === "Backspace") {
    if (currentIndex > 0) {
      spans[currentIndex].classList.remove("current");
      currentIndex--;

      if (spans[currentIndex].classList.contains("correct")) {
        correctChars--;
      }
      if (spans[currentIndex].classList.contains("incorrect")) {
        incorrectChars--;
      }

      spans[currentIndex].classList.remove("correct", "incorrect");
      spans[currentIndex].classList.add("current");

      totalTyped--;
      updateStats();
    }
    return;
  }

  if (currentIndex >= spans.length) return;

  totalTyped++;

  const currentSpan = spans[currentIndex];

  if (e.key === currentSpan.innerText) {
    currentSpan.classList.add("correct");
    correctChars++;
  } else {
    currentSpan.classList.add("incorrect");
    incorrectChars++;
  }

  currentSpan.classList.remove("current");
  currentIndex++;

  if (currentIndex < spans.length) {
    spans[currentIndex].classList.add("current");
  }

  updateStats();

  if (currentIndex === spans.length && modeSelect.value === "passage") {
    endTest();
  }
}

function endTest() {
  clearInterval(timer);
  started = false;
  alert("Test Complete!");
}

passageEl.addEventListener("keydown", handleTyping);
restartBtn.addEventListener("click", loadPassage);
difficultySelect.addEventListener("change", loadPassage);