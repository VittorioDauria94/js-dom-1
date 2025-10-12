// ==========================================================
// HTML ELEMENTS
// ==========================================================
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

// ==========================================================
// GAME STATE VARIABLES
// ==========================================================
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

// ==========================================================
// EVENT LISTENERS
// ==========================================================

// Load saved data when the page is ready
window.addEventListener("load", () => {
  loadGameState();
});

// Difficulty selection
difficultyButtons.forEach((btn) => {
  // Click → select difficulty
  btn.addEventListener("click", () => {
    difficulty = btn.dataset.difficulty;

    // Highlight selected button
    difficultyButtons.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    // Enable the Start button
    startBtn.disabled = false;

    // Hide warning if visible
    if (warning) warning.style.display = "none";
  });

  // Hover → show ghosts needed to win
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

    // Add one more ghost if Extra Ghost upgrade is active
    if (btn.dataset.difficulty !== "infinite" && upgradesBought.extraGhost) {
      ghostsNeeded++;
    }

    ghostsNeededMessage.innerText = window.i18n
      ? window.i18n.ghostsNeeded(ghostsNeeded)
      : `⚡ Ghosts to scare: ${ghostsNeeded}`;
    ghostsNeededMessage.classList.remove("hidden");
    ghostsNeededMessage.classList.add("visible");
  });

  // Hide tooltip on mouse leave
  btn.addEventListener("mouseout", () => {
    ghostsNeededMessage.classList.remove("visible");
    ghostsNeededMessage.classList.add("hidden");
  });
});

// Lamp switch click
onOffButton.addEventListener("click", () => {
  if (!gameActive) return;

  const now = Date.now();
  if (
    upgradesBought.doubleClickBonus &&
    now - lastClickTime < doubleClickThreshold
  ) {
    // Double-click detected → +5 coins
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

// Spacebar → also toggle the lamp
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && gameActive && !onOffButton.disabled) {
    event.preventDefault(); // prevent scroll
    const now = Date.now();

    if (
      upgradesBought.doubleClickBonus &&
      now - lastClickTime < doubleClickThreshold
    ) {
      money += 5;
      updateMoneyDisplay();
    }

    lastClickTime = now;
    isLampOn ? turnOffLamp() : turnOnLamp();
  }
});

// ==========================================================
// SHOP SYSTEM
// ==========================================================

// Open the shop
openShopBtn.addEventListener("click", () => {
  shopAlert.style.display = "block";
  onOffButton.disabled = true; // block lamp during shop
});

// Close the shop
closeShopBtn.addEventListener("click", () => {
  shopAlert.style.display = "none";
  onOffButton.disabled = false; // enable lamp again
});

// ==========================================================
// SHOP UPGRADES
// ==========================================================

// Update visual state of shop buttons
function updateShopButtons() {
  const buttons = [
    { id: "buy-slowerGhost", key: "slowerGhost" },
    { id: "buy-extraGhost", key: "extraGhost" },
    { id: "buy-doubleClickBonus", key: "doubleClickBonus" },
    { id: "buy-luckyGhost", key: "luckyGhost" },
    { id: "buy-extraLifeGhost", key: "extraLifeGhost" },
  ];

  const lang = window.i18n ? window.i18n.getLang() : "it";
  const alreadyBoughtText =
    lang === "it" ? "✅ Già acquistato" : "✅ Already purchased";

  buttons.forEach(({ id, key }) => {
    const btn = document.getElementById(id);
    if (upgradesBought[key]) {
      btn.disabled = true;
      btn.innerText = alreadyBoughtText;
      btn.style.background = "gray";
      btn.style.cursor = "not-allowed";
    }
  });
}

// --- Upgrade: Slower Ghost ---
document.getElementById("buy-slowerGhost").addEventListener("click", () => {
  if (money >= upgradeCost.slowerGhost && !upgradesBought.slowerGhost) {
    money -= upgradeCost.slowerGhost;
    upgradesBought.slowerGhost = true;
    ghostVisibleTime *= 1.3; // Ghost stays longer
    updateMoneyDisplay();
    updateShopButtons();
  }
});

// --- Upgrade: Extra Ghost ---
document.getElementById("buy-extraGhost").addEventListener("click", () => {
  if (money >= upgradeCost.extraGhost && !upgradesBought.extraGhost) {
    money -= upgradeCost.extraGhost;
    upgradesBought.extraGhost = true;
    ghostsToWin += 1; // One more ghost required to win
    updateMoneyDisplay();
    updateShopButtons();
  }
});

// --- Upgrade: Double Click Bonus ---
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
      updateShopButtons();
    }
  });

// --- Upgrade: Lucky Ghost ---
document.getElementById("buy-luckyGhost")?.addEventListener("click", () => {
  if (money >= upgradeCost.luckyGhost && !upgradesBought.luckyGhost) {
    money -= upgradeCost.luckyGhost;
    upgradesBought.luckyGhost = true;
    updateMoneyDisplay();
    updateShopButtons();
  }
});

// --- Upgrade: Extra Life Ghost ---
document.getElementById("buy-extraLifeGhost")?.addEventListener("click", () => {
  if (money >= upgradeCost.extraLifeGhost) {
    // Can buy again if used previously
    money -= upgradeCost.extraLifeGhost;
    upgradesBought.extraLifeGhost = true;
    extraLifeActive = false; // Reset life to be usable
    updateMoneyDisplay();

    const btn = document.getElementById("buy-extraLifeGhost");
    btn.disabled = true;
    btn.innerText = "✅ Vita pronta!";
    btn.style.background = "gray";
    btn.style.cursor = "not-allowed";
  }
});

// Refresh shop button state when page loads
window.addEventListener("load", updateShopButtons);
