const bodyElem = document.getElementById("body");
const unlitLamp = document.querySelector(".white-lamp");
const litLamp = document.querySelector(".yellow-lamp");
const onOffButton = document.getElementById("on-off-button");
const ghostImg = document.getElementById("ghost");
const numberOfGhostScared = document.querySelector("#counter span");
let scaredGhosts = parseInt(numberOfGhostScared.innerText);
let ghostCaught = false;
let isLampOn = false;
const introBox = document.getElementById("game-intro");
const startBtn = document.getElementById("start-btn");
const winAlert = document.getElementById("win-alert");
const loseAlert = document.getElementById("lose-alert");
const winRestartBtn = document.getElementById("win-restart-btn");
const loseRestartBtn = document.getElementById("lose-restart-btn");

onOffButton.addEventListener("click", () => {
  if (isLampOn) {
    turnOffLamp();
  } else {
    turnOnLamp();
  }
});

startBtn.addEventListener("click", () => {
  introBox.style.display = "none";
  showGhostRandomly();
});

winRestartBtn.addEventListener("click", () => {
  location.reload();
});

loseRestartBtn.addEventListener("click", () => {
  location.reload();
});
