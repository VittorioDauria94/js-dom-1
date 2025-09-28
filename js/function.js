// Random function

function generateRandomNumber(min, max) {
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}

function showGhostRandomly() {
  ghostImg.style.top = generateRandomNumber(1, 680) + "px";
  ghostImg.style.left = generateRandomNumber(1, 1122) + "px";
  ghostImg.style.transition = "opacity 10s ease-in";
  ghostImg.style.opacity = "1";
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
  hideGhost();

  setTimeout(() => {
    turnOffLamp();

    const randomTime = generateRandomNumber(5000, 15000);
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
}
