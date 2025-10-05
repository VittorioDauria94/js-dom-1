// ---------------------------
// ELEMENTI HTML
// ---------------------------
const bodyElem = document.getElementById("body");
const unlitLamp = document.querySelector(".white-lamp");
const litLamp = document.querySelector(".yellow-lamp");
const onOffButton = document.getElementById("on-off-button");
const ghostImg = document.getElementById("ghost");
const numberOfGhostScared = document.querySelector("#counter span");
const introBox = document.getElementById("game-intro");
const startBtn = document.getElementById("start-btn");
const winAlert = document.getElementById("win-alert");
const loseAlert = document.getElementById("lose-alert");
const winRestartBtn = document.getElementById("win-restart-btn");
const loseRestartBtn = document.getElementById("lose-restart-btn");
const switchContainer = document.querySelector(".switch");
const slider = document.querySelector(".slider");

// ---------------------------
// VARIABILI STATO
// ---------------------------
let scaredGhosts = 0;
let ghostCaught = false;
let isLampOn = false;
let gameActive = false;
let ghostTimeout;

// ---------------------------
// EVENT LISTENERS
// ---------------------------

// Switch click
onOffButton.addEventListener("click", () => {
  if (!gameActive) return;
  isLampOn ? turnOffLamp() : turnOnLamp();
});

// Start game
startBtn.addEventListener("click", () => {
  introBox.style.display = "none";
  gameActive = true;
  scaredGhosts = 0;
  numberOfGhostScared.innerText = scaredGhosts;
  onOffButton.disabled = false;

  const randomTime = generateRandomNumber(500, 5000);
  ghostTimeout = setTimeout(showGhostRandomly, randomTime);
});

// Restart buttons
winRestartBtn.addEventListener("click", () => location.reload());
loseRestartBtn.addEventListener("click", () => location.reload());
