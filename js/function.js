// Random function

function generateRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function showGhostRandomly() {
  ghostImg.style.top = generateRandomNumber(1, 680) + "px";
  ghostImg.style.left = generateRandomNumber(1, 1122) + "px";
  ghostImg.style.transition = "opacity 1s ease-in";
  ghostImg.style.opacity = "1";
  ghostCaught = false;

  ghostImg.addEventListener("transitionend", checkGhostCaught, { once: true });
}

function hideGhost() {
  ghostImg.style.transition = "opacity 1s ease-out";
  ghostImg.style.opacity = "0";
}

function turnOnLamp() {
  bodyElem.classList.remove("background-black");
  unlitLamp.classList.add("display-none");
  litLamp.classList.add("display-block");
  onOffButton.innerHTML = "On";
  onOffButton.classList.add("on");
  isLampOn = true;
  switchOnVisuals();

  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);
  if (ghostOpacity > 0 && ghostOpacity < 1) {
    scaredGhosts++;
    numberOfGhostScared.innerText = scaredGhosts;
    ghostCaught = true;

    if (scaredGhosts >= 5) {
      winAlert.style.display = "block";
      bodyElem.classList.remove("background-black");
      onOffButton.disabled = true;
      hideGhost();
      return;
    }
  } else if (ghostOpacity === 0) {
    loseAlert.style.display = "block";
    onOffButton.disabled = true;
    turnOffLamp();
    return;
  }

  hideGhost();

  setTimeout(() => {
    turnOffLamp();

    const randomTime = generateRandomNumber(500, 5000);
    setTimeout(() => {
      showGhostRandomly();
    }, randomTime);
  }, 5000);
}

function turnOffLamp() {
  bodyElem.classList.add("background-black");
  unlitLamp.classList.remove("display-none");
  litLamp.classList.remove("display-block");
  onOffButton.innerHTML = "Off";
  onOffButton.classList.remove("on");
  isLampOn = false;
  switchOffVisuals();
}

function checkGhostCaught() {
  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);
  if (!ghostCaught && ghostOpacity === 1) {
    loseAlert.style.display = "block";
    onOffButton.disabled = true;
    turnOffLamp();
  }
}

function switchOnVisuals() {
  switchContainer.style.background = "#bfa181";
  slider.style.backgroundColor = "#4caf50";
}

function switchOffVisuals() {
  switchContainer.style.background = "#030411ff";
  slider.style.backgroundColor = "#e63946";
}
