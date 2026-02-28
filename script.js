const passageEl = document.getElementById("passage");
const difficultySelect = document.getElementById("difficulty");
const restartBtn = document.getElementById("restart");

let passages = {};
let currentPassage = "";
let currentIndex = 0;

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

function handleTyping(e) {
  const spans = passageEl.querySelectorAll("span");

  if (e.key === "Backspace") {
    if (currentIndex > 0) {
      spans[currentIndex].classList.remove("current");
      currentIndex--;
      spans[currentIndex].classList.remove("correct", "incorrect");
      spans[currentIndex].classList.add("current");
    }
    return;
  }

  if (currentIndex >= spans.length) return;

  const currentSpan = spans[currentIndex];

  if (e.key === currentSpan.innerText) {
    currentSpan.classList.add("correct");
  } else {
    currentSpan.classList.add("incorrect");
  }

  currentSpan.classList.remove("current");
  currentIndex++;

  if (currentIndex < spans.length) {
    spans[currentIndex].classList.add("current");
  }
}

passageEl.addEventListener("keydown", handleTyping);
restartBtn.addEventListener("click", loadPassage);
difficultySelect.addEventListener("change", loadPassage);