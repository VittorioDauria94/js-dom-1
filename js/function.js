// ==========================================================
// UTILITY FUNCTIONS
// ==========================================================

// Generate random number between min and max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set game difficulty parameters
function setDifficultyParameters() {
  if (difficulty === "infinite") {
    if (scaredGhosts < 5) {
      ghostFadeTime = 1500;
      ghostVisibleTime = 7000;
    } else if (scaredGhosts < 10) {
      ghostFadeTime = 1000;
      ghostVisibleTime = 5000;
    } else if (scaredGhosts < 15) {
      ghostFadeTime = 700;
      ghostVisibleTime = 4000;
    } else {
      const speedFactor = Math.max(0.3, 1 - (scaredGhosts - 15) * 0.05);
      ghostFadeTime = 700 * speedFactor;
      ghostVisibleTime = 4000 * speedFactor;
    }

    ghostsToWin = Infinity;
  } else {
    switch (difficulty) {
      case "easy":
        ghostFadeTime = 1500;
        ghostVisibleTime = 7000;
        ghostsToWin = 5;
        break;
      case "medium":
        ghostFadeTime = 1000;
        ghostVisibleTime = 5000;
        ghostsToWin = 10;
        break;
      case "hard":
        ghostFadeTime = 700;
        ghostVisibleTime = 4000;
        ghostsToWin = 15;
        break;
    }

    // Apply upgrade "Extra Ghost"
    if (upgradesBought.extraGhost) {
      ghostsToWin += 1;
    }
  }
}

// Show ghost at random position
function showGhostRandomly() {
  clearTimeout(ghostTimeout);
  if (!gameActive) return;

  // Determine if Lucky Ghost appears
  isLuckyGhost = upgradesBought.luckyGhost && Math.random() < 0.1;
  ghostImg.data = isLuckyGhost ? "./img/golden_ghost.svg" : "./img/ghost.svg";

  // Random position inside container
  const container = ghostImg.parentElement;
  const maxTop = container.clientHeight - ghostImg.offsetHeight;
  const maxLeft = container.clientWidth - ghostImg.offsetWidth;
  ghostImg.style.top = generateRandomNumber(0, maxTop) + "px";
  ghostImg.style.left = generateRandomNumber(0, maxLeft) + "px";

  // Fade in
  ghostImg.style.transition = `opacity ${ghostFadeTime / 1000}s ease-in`;
  ghostImg.style.opacity = "1";
  ghostCaught = false;

  // Check if ghost was caught after fade-in
  ghostImg.addEventListener("transitionend", checkGhostCaught, { once: true });

  // Hide ghost after visible time
  if (ghostVisibleTime !== Infinity) {
    ghostTimeout = setTimeout(() => {
      hideGhost();
      const randomTime = generateRandomNumber(500, 5000);
      ghostTimeout = setTimeout(showGhostRandomly, randomTime);
    }, ghostVisibleTime);
  }
}

// Hide ghost
function hideGhost() {
  ghostImg.style.transition = `opacity ${ghostFadeTime / 1000}s ease-out`;
  ghostImg.style.opacity = "0";
}

// Turn on the lamp
function turnOnLamp() {
  if (!gameActive) return;
  clearTimeout(ghostTimeout);

  // Visual lamp on
  document.body.classList.add("lamp-on");
  unlitLamp.classList.add("display-none");
  litLamp.classList.add("display-block");
  isLampOn = true;
  switchOnVisuals();

  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);

  if (ghostOpacity > 0) {
    // Ghost caught
    scaredGhosts++;
    numberOfGhostScared.innerText = scaredGhosts;
    ghostCaught = true;

    // Base reward + Lucky Ghost bonus
    money += 10;
    if (isLuckyGhost) money += 50;
    updateMoneyDisplay();

    // Increase difficulty for infinite mode
    if (difficulty === "infinite" && scaredGhosts % 5 === 0) {
      increaseInfiniteDifficulty();
      showDifficultyMessage();
    }

    // Check win condition
    if (scaredGhosts >= ghostsToWin && ghostsToWin !== Infinity) {
      winGame();
      return;
    }
  } else {
    // No ghost visible → lose
    loseGame();
    return;
  }

  hideGhost();

  // Next ghost spawn
  ghostTimeout = setTimeout(() => {
    turnOffLamp();
    const randomTime = generateRandomNumber(500, 5000);
    ghostTimeout = setTimeout(showGhostRandomly, randomTime);
  }, ghostVisibleTime);
}

// Turn off the lamp
function turnOffLamp() {
  document.body.classList.remove("lamp-on");
  unlitLamp.classList.remove("display-none");
  litLamp.classList.remove("display-block");
  isLampOn = false;
  switchOffVisuals();
  hideDifficultyMessage();
}

// Check if ghost was caught
function checkGhostCaught() {
  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);
  if (!ghostCaught && ghostOpacity === 1) {
    loseGame();
  }
}

// Lamp visual ON
function switchOnVisuals() {
  switchContainer.style.background = "#bfa181";
  slider.style.backgroundColor = "#4caf50";
}

// Lamp visual OFF
function switchOffVisuals() {
  switchContainer.style.background = "#030411ff";
  slider.style.backgroundColor = "#e63946";
}

// Show temporary message when difficulty increases
function showDifficultyMessage() {
  const msg = document.getElementById("difficulty-message");
  if (!isLampOn) return;

  msg.classList.remove("hidden");
  msg.classList.add("visible");

  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(() => {
    msg.classList.remove("visible");
    msg.classList.add("hidden");
  }, 2500);
}

// Hide difficulty message
function hideDifficultyMessage() {
  const msg = document.getElementById("difficulty-message");
  msg.classList.remove("visible");
  msg.classList.add("hidden");
}

// Gradually increase infinite mode difficulty
function increaseInfiniteDifficulty() {
  if (ghostFadeTime > 400) ghostFadeTime -= 100;
  if (ghostVisibleTime > 2000) ghostVisibleTime -= 500;
}

// Update shop money display
function updateMoneyDisplay() {
  const moneyDisplay = document.getElementById("money-display");
  moneyDisplay.innerText = `💰 ${money}`;
  localStorage.setItem("money", money);
}

// ==========================================================
// GAME END FUNCTIONS
// ==========================================================

// Save current game state
function saveGameState() {
  localStorage.setItem("money", money);
  localStorage.setItem("upgradesBought", JSON.stringify(upgradesBought));
}

// Load saved game state
function loadGameState() {
  const savedMoney = localStorage.getItem("money");
  const savedUpgrades = localStorage.getItem("upgradesBought");

  if (savedMoney) money = parseInt(savedMoney);
  if (savedUpgrades) upgradesBought = JSON.parse(savedUpgrades);

  updateMoneyDisplay();
}

// Restart the game
function restartGame() {
  // Hide win/lose alerts
  winAlert.style.display = "none";
  loseAlert.style.display = "none";

  // Make sure lamp is turned off
  turnOffLamp();

  // Show intro window
  introBox.style.display = "block";

  // Reset main game variables
  scaredGhosts = 0;
  numberOfGhostScared.innerText = scaredGhosts;
  gameActive = false;
  isLampOn = false;
  onOffButton.disabled = true;
  extraLifeActive = false;

  // Hide ghost
  hideGhost();

  // Update money and upgrades
  updateMoneyDisplay();

  // Reset difficulty selection state
  difficulty = "";
  difficultyButtons.forEach((btn) => btn.classList.remove("selected"));
  startBtn.disabled = false;
}

// Player wins
function winGame() {
  gameActive = false;
  hideGhost();
  clearTimeout(ghostTimeout);
  onOffButton.disabled = true;

  const lang = window.i18n ? window.i18n.getLang() : "it";
  const t = translations[lang] || translations.it;

  const totalGhosts =
    ghostsToWin === Infinity
      ? lang === "it"
        ? "infiniti"
        : "infinite"
      : ghostsToWin;

  const message =
    lang === "it"
      ? `🎉 Hai vinto! 🎉<br>Hai spaventato ${totalGhosts} fantasmi!`
      : `🎉 You won! 🎉<br>You scared ${totalGhosts} ghosts!`;

  winAlert.querySelector("p").innerHTML = message;
  winAlert.style.display = "block";

  if (window.i18n) applyLanguage(lang);
}

// Player loses
function loseGame() {
  if (upgradesBought.extraLifeGhost && !extraLifeActive) {
    extraLifeActive = true;
    upgradesBought.extraLifeGhost = false;

    hideGhost();
    turnOffLamp();
    const randomTime = generateRandomNumber(500, 5000);
    ghostTimeout = setTimeout(showGhostRandomly, randomTime);

    const lifeBtn = document.getElementById("buy-extraLifeGhost");
    if (lifeBtn) {
      lifeBtn.disabled = false;
      lifeBtn.innerText = window.i18n
        ? window.i18n.extraLifeRebuy()
        : "💚 Riacquista Vita (120 💰)";
      lifeBtn.style.background = "#4caf50";
      lifeBtn.style.cursor = "pointer";
    }

    return;
  }

  gameActive = false;
  loseAlert.style.display = "block";
  onOffButton.disabled = true;
  turnOffLamp();
  hideGhost();
  clearTimeout(ghostTimeout);

  if (window.i18n) applyLanguage(window.i18n.getLang());
}


// 👻 Lamp Away — developed by Vittorio D’Auria