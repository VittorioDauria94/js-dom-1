const bodyElem = document.getElementById("body");
const unlitLamp = document.querySelector(".white-lamp");
const litLamp = document.querySelector(".yellow-lamp");
const onOffButton = document.getElementById("on-off-button");
const ghostImg = document.getElementById("ghost");
const numberOfGhostScared = document.querySelector("#counter span");
let scaredGhosts = parseInt(numberOfGhostScared.innerText);
let ghostCaught = false;
let isLampOn = false;

onOffButton.addEventListener("click", () => {
  if (isLampOn) {
    turnOffLamp();
  } else {
    turnOnLamp();
  }
  isLampOn = !isLampOn;
});

window.addEventListener("load", () => {
  alert(
    "Benvenuto!\n\nRegole del gioco:\n- Il fantasma apparirà lentamente.\n- Clicca sulla lampada prima che il fantasma sia completamente visibile per spaventarlo.\n- Se non clicchi in tempo o se accendi la luce prima che sia apparso, hai perso.\n- Se spaventi 5 fantasmi, vinci!\n\nClicca OK per iniziare."
  );

  showGhostRandomly();
});
