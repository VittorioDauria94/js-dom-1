// ---------------------------
// FUNZIONI UTILI
// ---------------------------

// Genera numero casuale tra min e max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Scegli la difficoltà
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
  }
}

// Mostra il fantasma in posizione casuale
function showGhostRandomly() {
  clearTimeout(ghostTimeout);
  if (!gameActive) return;

  // Determina se è Lucky Ghost
  isLuckyGhost = upgradesBought.luckyGhost && Math.random() < 0.1; // 10% possibilità
  ghostImg.src = isLuckyGhost ? "./img/golden_ghost.svg" : "./img/ghost.svg";

  // Posizione casuale del fantasma
  const container = ghostImg.parentElement;
  const maxTop = container.clientHeight - ghostImg.offsetHeight;
  const maxLeft = container.clientWidth - ghostImg.offsetWidth;
  ghostImg.style.top = generateRandomNumber(0, maxTop) + "px";
  ghostImg.style.left = generateRandomNumber(0, maxLeft) + "px";

  // Fade-in
  ghostImg.style.transition = `opacity ${ghostFadeTime / 1000}s ease-in`;
  ghostImg.style.opacity = "1";

  ghostCaught = false;

  // Controlla cattura fantasma
  ghostImg.addEventListener("transitionend", checkGhostCaught, { once: true });

  // Nascondi automaticamente dopo ghostVisibleTime
  if (ghostVisibleTime !== Infinity) {
    ghostTimeout = setTimeout(() => {
      hideGhost();
      const randomTime = generateRandomNumber(500, 5000);
      ghostTimeout = setTimeout(showGhostRandomly, randomTime);
    }, ghostVisibleTime);
  }
}

// Nasconde il fantasma
function hideGhost() {
  ghostImg.style.transition = `opacity ${ghostFadeTime / 1000}s ease-out`;
  ghostImg.style.opacity = "0";
}

// Accendi la lampada
function turnOnLamp() {
  if (!gameActive) return;

  clearTimeout(ghostTimeout);

  // Accendi lampada
  document.body.classList.add("lamp-on");
  unlitLamp.classList.add("display-none");
  litLamp.classList.add("display-block");
  isLampOn = true;
  switchOnVisuals();

  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);

  if (ghostOpacity > 0) {
    // Fantasma catturato
    scaredGhosts++;
    numberOfGhostScared.innerText = scaredGhosts;
    ghostCaught = true;

    // Guadagno base + Lucky Ghost
    money += 10;
    if (isLuckyGhost) money += 50;
    updateMoneyDisplay();

    // Controlla difficoltà infinita
    if (difficulty === "infinite" && scaredGhosts % 5 === 0) {
      increaseInfiniteDifficulty();
      showDifficultyMessage();
    }

    // Controlla vittoria
    if (scaredGhosts >= ghostsToWin && ghostsToWin !== Infinity) {
      winGame();
      return;
    }
  } else {
    // Nessun fantasma → sconfitta
    loseGame();
    return;
  }

  hideGhost();

  // Prossimo fantasma
  ghostTimeout = setTimeout(() => {
    turnOffLamp();
    const randomTime = generateRandomNumber(500, 5000);
    ghostTimeout = setTimeout(showGhostRandomly, randomTime);
  }, ghostVisibleTime);
}

// Spegni la lampada
function turnOffLamp() {
  document.body.classList.remove("lamp-on");
  unlitLamp.classList.remove("display-none");
  litLamp.classList.remove("display-block");
  isLampOn = false;
  switchOffVisuals();
  hideDifficultyMessage();
}

// Controlla se il fantasma è stato catturato
function checkGhostCaught() {
  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);
  if (!ghostCaught && ghostOpacity === 1) {
    loseGame();
  }
}

// Aggiorna lo stile dello switch quando acceso
function switchOnVisuals() {
  switchContainer.style.background = "#bfa181";
  slider.style.backgroundColor = "#4caf50";
}

// Aggiorna lo stile dello switch quando spento
function switchOffVisuals() {
  switchContainer.style.background = "#030411ff";
  slider.style.backgroundColor = "#e63946";
}

// Mostra un messaggio temporaneo quando la difficoltà aumenta (solo se luce accesa)
function showDifficultyMessage() {
  const msg = document.getElementById("difficulty-message");
  if (!isLampOn) return; // mostralo solo se la luce è accesa

  msg.classList.remove("hidden");
  msg.classList.add("visible");

  clearTimeout(msgTimeout);
  msgTimeout = setTimeout(() => {
    msg.classList.remove("visible");
    msg.classList.add("hidden");
  }, 2500);
}

// Nasconde il messaggio quando spegni la luce
function hideDifficultyMessage() {
  const msg = document.getElementById("difficulty-message");
  msg.classList.remove("visible");
  msg.classList.add("hidden");
}

function increaseInfiniteDifficulty() {
  if (ghostFadeTime > 400) ghostFadeTime -= 100;
  if (ghostVisibleTime > 2000) ghostVisibleTime -= 500;
}

function updateMoneyDisplay() {
  const moneyDisplay = document.getElementById("money-display");
  moneyDisplay.innerText = `💰 ${money}`;
  localStorage.setItem("money", money);
}

// ---------------------------
// FUNZIONI DI FINE GIOCO
// ---------------------------
function saveGameState() {
  localStorage.setItem("money", money);
  localStorage.setItem("upgradesBought", JSON.stringify(upgradesBought));
}

function loadGameState() {
  const savedMoney = localStorage.getItem("money");
  const savedUpgrades = localStorage.getItem("upgradesBought");

  if (savedMoney) money = parseInt(savedMoney);
  if (savedUpgrades) upgradesBought = JSON.parse(savedUpgrades);

  updateMoneyDisplay();
}

function restartGame() {
  // Nascondi win/lose alert
  winAlert.style.display = "none";
  loseAlert.style.display = "none";

  // Mostra l'intro box
  introBox.style.display = "block";

  // Reset variabili di gioco principali
  scaredGhosts = 0;
  numberOfGhostScared.innerText = scaredGhosts;
  gameActive = false;
  isLampOn = false;
  onOffButton.disabled = true;
  extraLifeActive = false; // reset extra life

  // Nascondi il fantasma
  hideGhost();

  // Ripristina upgrade applicati
  if (upgradesBought.fasterLamp) ghostFadeTime *= 0.8;
  if (upgradesBought.extraGhost) ghostsToWin += 1;

  // Aggiorna display soldi e eventuali upgrade
  updateMoneyDisplay();
}

function winGame() {
  gameActive = false;
  winAlert.style.display = "block";
  onOffButton.disabled = true;
  hideGhost();
  clearTimeout(ghostTimeout);
}

function loseGame() {
  if (upgradesBought.extraLifeGhost && !extraLifeActive) {
    extraLifeActive = true; // consuma extra life
    // riprendi il gioco senza fine
    hideGhost();
    turnOffLamp();
    const randomTime = generateRandomNumber(500, 5000);
    ghostTimeout = setTimeout(showGhostRandomly, randomTime);
    return;
  }

  gameActive = false;
  loseAlert.style.display = "block";
  onOffButton.disabled = true;
  turnOffLamp();
  hideGhost();
  clearTimeout(ghostTimeout);
}
