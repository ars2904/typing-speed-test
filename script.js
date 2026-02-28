// ======= ELEMENTS =======
const passageEl = document.getElementById("passage");
const difficultySelect = document.getElementById("difficulty");
const modeSelect = document.getElementById("mode");
const durationSelect = document.getElementById("duration");
const restartBtn = document.getElementById("restart");

const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");
const accuracyEl = document.getElementById("accuracy");

const resultsSection = document.querySelector(".results");
const resultMessage = document.getElementById("result-message");
const finalWpmEl = document.getElementById("final-wpm");
const finalAccuracyEl = document.getElementById("final-accuracy");
const charStatsEl = document.getElementById("char-stats");

// ======= STATE =======
let passages = {};          // will hold JSON passages
let currentPassage = "";
let currentIndex = 0;

let timer = null;
let time = 0;
let started = false;
let testEnded = false;

let correctChars = 0;
let incorrectChars = 0;
let totalTyped = 0;

// ======= LOAD PASSAGES =======
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    passages = data;
    loadPassage();
  });

// ======= LOAD RANDOM PASSAGE =======
function loadPassage() {
  resultsSection.classList.add("hidden");

  const difficulty = difficultySelect.value;
  const list = passages[difficulty] || [];
  currentPassage = list[Math.floor(Math.random() * list.length)] || "";

  passageEl.innerHTML = "";
  currentIndex = 0;

  resetStats();

  currentPassage.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.innerText = char;
    if (index === 0) span.classList.add("current");
    passageEl.appendChild(span);
  });

  passageEl.focus();
}

// ======= RESET STATS =======
function resetStats() {
  clearInterval(timer);
  time = 0;
  started = false;
  testEnded = false;
  correctChars = 0;
  incorrectChars = 0;
  totalTyped = 0;

  timeEl.innerText = 0;
  wpmEl.innerText = 0;
  accuracyEl.innerText = 100;

  difficultySelect.disabled = false;
  modeSelect.disabled = false;
  durationSelect.disabled = false;
}

// ======= START TIMER =======
function startTimer() {
  if (started) return;
  started = true;

  difficultySelect.disabled = true;
  modeSelect.disabled = true;
  durationSelect.disabled = true;

  const duration = modeSelect.value === "timed" ? parseInt(durationSelect.value) : Infinity;

  timer = setInterval(() => {
    time++;
    timeEl.innerText = time;
    if (time >= duration) endTest();
  }, 1000);
}

// ======= UPDATE STATS =======
function updateStats() {
  const minutes = time > 0 ? time / 60 : 1 / 60;
  const wpm = Math.round((correctChars / 5) / minutes);
  const accuracy = totalTyped ? Math.round((correctChars / totalTyped) * 100) : 100;

  wpmEl.innerText = wpm;
  accuracyEl.innerText = accuracy;
}

// ======= HANDLE TYPING =======
function handleTyping(e) {
  if (testEnded) return;

  // Ignore non-character keys except Backspace
  if (e.key.length > 1 && e.key !== "Backspace") return;

  startTimer();

  const spans = passageEl.querySelectorAll("span");

  // BACKSPACE
  if (e.key === "Backspace") {
    if (currentIndex > 0) {
      spans[currentIndex].classList.remove("current");
      currentIndex--;

      if (spans[currentIndex].classList.contains("correct")) correctChars--;
      if (spans[currentIndex].classList.contains("incorrect")) incorrectChars--;

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
  if (currentIndex < spans.length) spans[currentIndex].classList.add("current");

  updateStats();

  if (modeSelect.value === "passage") checkTestCompletion();
}

// ======= CHECK PASSAGE COMPLETION =======
function checkTestCompletion() {
  const spans = passageEl.querySelectorAll("span");
  if (currentIndex >= spans.length) endTest();
}

// ======= END TEST =======
function endTest() {
  clearInterval(timer);
  started = false;
  testEnded = true;

  const finalWpm = parseInt(wpmEl.innerText);
  const finalAccuracy = accuracyEl.innerText;

  finalWpmEl.innerText = finalWpm;
  finalAccuracyEl.innerText = finalAccuracy;
  charStatsEl.innerText = `${correctChars} correct / ${incorrectChars} incorrect`;

  let personalBest = parseInt(localStorage.getItem("personalBest"));

  if (isNaN(personalBest)) {
    localStorage.setItem("personalBest", finalWpm);
    resultMessage.innerText = "Baseline Established! 🚀";
  } else if (finalWpm > personalBest) {
    localStorage.setItem("personalBest", finalWpm);
    resultMessage.innerText = "High Score Smashed! 🎉";
    fireConfetti();
  } else {
    resultMessage.innerText = `Personal Best: ${personalBest} WPM`;
  }

  resultsSection.classList.remove("hidden");
}

// ======= FIRE CONFETTI =======
function fireConfetti() {
  const duration = 2 * 1000;
  const end = Date.now() + duration;
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// ======= EVENT LISTENERS =======
document.addEventListener("keydown", handleTyping);
restartBtn.addEventListener("click", loadPassage);
difficultySelect.addEventListener("change", loadPassage);
modeSelect.addEventListener("change", () => {
  loadPassage();
  durationSelect.style.display = modeSelect.value === "passage" ? "none" : "inline-block";
});