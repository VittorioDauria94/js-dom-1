// ---------------------------
// FUNZIONI UTILI
// ---------------------------

// Genera numero casuale tra min e max
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Mostra il fantasma in posizione casuale all'interno del container
function showGhostRandomly() {
  if (!gameActive) return;

  const container = ghostImg.parentElement;
  const maxTop = container.clientHeight - ghostImg.offsetHeight;
  const maxLeft = container.clientWidth - ghostImg.offsetWidth;

  ghostImg.style.top = generateRandomNumber(0, maxTop) + "px";
  ghostImg.style.left = generateRandomNumber(0, maxLeft) + "px";
  ghostImg.style.transition = "opacity 1s ease-in";
  ghostImg.style.opacity = "1";

  ghostCaught = false;

  ghostImg.addEventListener("transitionend", checkGhostCaught, { once: true });
}

// Nasconde il fantasma
function hideGhost() {
  ghostImg.style.transition = "opacity 1s ease-out";
  ghostImg.style.opacity = "0";
}

// Accendi la lampada
function turnOnLamp() {
  if (!gameActive) return;

  bodyElem.classList.remove("background-black");
  unlitLamp.classList.add("display-none");
  litLamp.classList.add("display-block");
  isLampOn = true;
  switchOnVisuals();

  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);

  if (ghostOpacity > 0 && ghostOpacity < 1) {
    scaredGhosts++;
    numberOfGhostScared.innerText = scaredGhosts;
    ghostCaught = true;

    if (scaredGhosts >= 5) {
      winGame();
      return;
    }
  } else if (ghostOpacity === 0) {
    loseGame();
    return;
  }

  hideGhost();

  ghostTimeout = setTimeout(() => {
    turnOffLamp();
    const randomTime = generateRandomNumber(500, 5000);
    ghostTimeout = setTimeout(showGhostRandomly, randomTime);
  }, 5000);
}

// Spegni la lampada
function turnOffLamp() {
  bodyElem.classList.add("background-black");
  unlitLamp.classList.remove("display-none");
  litLamp.classList.remove("display-block");
  isLampOn = false;
  switchOffVisuals();
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

// ---------------------------
// FUNZIONI DI FINE GIOCO
// ---------------------------
function winGame() {
  gameActive = false;
  winAlert.style.display = "block";
  onOffButton.disabled = true;
  hideGhost();
  clearTimeout(ghostTimeout);
}

function loseGame() {
  gameActive = false;
  loseAlert.style.display = "block";
  onOffButton.disabled = true;
  turnOffLamp();
  hideGhost();
  clearTimeout(ghostTimeout);
}
