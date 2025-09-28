const bodyElem = document.getElementById("body");
const unlitLamp = document.querySelector(".white-lamp");
const litLamp = document.querySelector(".yellow-lamp");
const onOffButton = document.getElementById("on-off-button");
const ghostImg = document.getElementById("ghost");
const numberOfGhostScared = document.querySelector("#counter span");
let scaredGhosts = parseInt(numberOfGhostScared.innerText);

onOffButton.addEventListener("click", () => {
  const ghostOpacity = parseFloat(window.getComputedStyle(ghostImg).opacity);
  if (ghostOpacity > 0 && ghostOpacity < 1) {
    scaredGhosts++;
    numberOfGhostScared.innerText = scaredGhosts;
  }

  if (onOffButton.innerHTML === "Off") {
    turnOnLamp();
  } else {
    turnOffLamp();
  }
});

window.addEventListener("load", () => {
  showGhostRandomly();
});
