// ---------------------------
// ELEMENTI HTML
// ---------------------------
const doubleClickThreshold = 300;
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
const difficultyButtons = document.querySelectorAll(
  "#difficulty-selection button"
);
const warning = document.getElementById("difficulty-warning");
const msg = document.getElementById("difficulty-message");
const ghostsNeededMessage = document.getElementById("ghosts-needed-message");
const shopAlert = document.getElementById("shop-alert");
const closeShopBtn = document.getElementById("close-shop-btn");
const openShopBtn = document.getElementById("open-shop-btn");
const goldenGhost = document.getElementById("golden-ghost");

// ---------------------------
// VARIABILI STATO
// ---------------------------
let money = parseInt(localStorage.getItem("money")) || 0;
let lastClickTime = 0;
let extraLifeActive = false;
let isLuckyGhost = false;
let scaredGhosts = 0;
let ghostCaught = false;
let isLampOn = false;
let gameActive = false;
let ghostTimeout;
let difficulty = "";
let ghostFadeTime = 1000;
let ghostVisibleTime = 5000;
let ghostsToWin = 5;
let msgTimeout;
let upgradeCost = {
  slowerGhost: 50,
  extraGhost: 100,
  doubleClickBonus: 75,
  luckyGhost: 150,
  extraLifeGhost: 120,
};
let upgradesBought = {
  slowerGhost: false,
  extraGhost: false,
  doubleClickBonus: false,
  luckyGhost: false,
  extraLifeGhost: false,
};

// ---------------------------
// EVENT LISTENERS
// ---------------------------

window.addEventListener("load", () => {
  loadGameState();
});

// Selezione difficoltà
difficultyButtons.forEach((btn) => {
  // CLICK: selezione difficoltà
  btn.addEventListener("click", () => {
    difficulty = btn.dataset.difficulty;

    // evidenzia bottone selezionato
    difficultyButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    // abilita il pulsante Start quando una difficoltà è selezionata
    startBtn.disabled = false;

    // nascondi messaggio di warning se presente
    if (warning) warning.style.display = "none";
  });

  // HOVER: mostra quanti fantasmi servono
  btn.addEventListener("mouseover", () => {
    let ghostsNeeded = 0;
    switch (btn.dataset.difficulty) {
      case "easy":
        ghostsNeeded = 5;
        break;
      case "medium":
        ghostsNeeded = 10;
        break;
      case "hard":
        ghostsNeeded = 15;
        break;
      case "infinite":
        ghostsNeeded = "∞";
        break;
    }
    ghostsNeededMessage.innerText = `⚡ Fantasmi da spaventare: ${ghostsNeeded}`;
    ghostsNeededMessage.classList.remove("hidden");
    ghostsNeededMessage.classList.add("visible");
  });

  btn.addEventListener("mouseout", () => {
    ghostsNeededMessage.classList.remove("visible");
    ghostsNeededMessage.classList.add("hidden");
  });
});

// Switch click
onOffButton.addEventListener("click", () => {
  if (!gameActive) return;

  const now = Date.now();
  if (
    upgradesBought.doubleClickBonus &&
    now - lastClickTime < doubleClickThreshold
  ) {
    // doppio click riconosciuto
    money += 5;
    updateMoneyDisplay();
  }
  lastClickTime = now;

  isLampOn ? turnOffLamp() : turnOnLamp();
});

// Start game
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;

  if (!difficulty) {
    warning.style.display = "block";
    return;
  }

  warning.style.display = "none";
  introBox.style.display = "none";
  gameActive = true;
  scaredGhosts = 0;
  numberOfGhostScared.innerText = scaredGhosts;
  onOffButton.disabled = false;

  setDifficultyParameters();

  const randomTime = generateRandomNumber(500, 5000);
  ghostTimeout = setTimeout(showGhostRandomly, randomTime);
});

// Restart buttons
winRestartBtn.addEventListener("click", () => {
  saveGameState();
  restartGame();
});

loseRestartBtn.addEventListener("click", () => {
  saveGameState();
  restartGame();
});

// Shop
document.getElementById("buy-slowerGhost").addEventListener("click", () => {
  if (money >= upgradeCost.slowerGhost && !upgradesBought.slowerGhost) {
    money -= upgradeCost.slowerGhost;
    upgradesBought.slowerGhost = true;

    // BONUS: i fantasmi restano visibili più a lungo
    ghostVisibleTime *= 1.3;

    updateMoneyDisplay();
  } else {
    alert("Monete insufficienti o già acquistato!");
  }
});

document.getElementById("buy-extraGhost").addEventListener("click", () => {
  if (money >= upgradeCost.extraGhost && !upgradesBought.extraGhost) {
    money -= upgradeCost.extraGhost;
    upgradesBought.extraGhost = true;
    ghostsToWin += 1;
    updateMoneyDisplay();
  } else {
    alert("Monete insufficienti o già acquistato!");
  }
});

document
  .getElementById("buy-doubleClickBonus")
  ?.addEventListener("click", () => {
    if (
      money >= upgradeCost.doubleClickBonus &&
      !upgradesBought.doubleClickBonus
    ) {
      money -= upgradeCost.doubleClickBonus;
      upgradesBought.doubleClickBonus = true;
      updateMoneyDisplay();
    }
  });

document.getElementById("buy-luckyGhost")?.addEventListener("click", () => {
  if (money >= upgradeCost.luckyGhost && !upgradesBought.luckyGhost) {
    money -= upgradeCost.luckyGhost;
    upgradesBought.luckyGhost = true;
    updateMoneyDisplay();
  }
});

document.getElementById("buy-extraLifeGhost")?.addEventListener("click", () => {
  if (money >= upgradeCost.extraLifeGhost && !upgradesBought.extraLifeGhost) {
    money -= upgradeCost.extraLifeGhost;
    upgradesBought.extraLifeGhost = true;
    updateMoneyDisplay();
  }
});

openShopBtn.addEventListener("click", () => {
  shopAlert.style.display = "block";
  onOffButton.disabled = true; // blocca la lampada mentre shop aperto
});

closeShopBtn.addEventListener("click", () => {
  shopAlert.style.display = "none";
  onOffButton.disabled = false; // riabilita lampada
});
