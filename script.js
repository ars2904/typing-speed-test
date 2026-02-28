const passageEl = document.getElementById("passage");
const difficultySelect = document.getElementById("difficulty");
const restartBtn = document.getElementById("restart");

let passages = {};
let currentPassage = "";

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

  currentPassage.split("").forEach(char => {
    const span = document.createElement("span");
    span.innerText = char;
    passageEl.appendChild(span);
  });
}

restartBtn.addEventListener("click", loadPassage);
difficultySelect.addEventListener("change", loadPassage);