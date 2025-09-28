const bodyElem = document.getElementById("body");
const unlitLamp = document.querySelector(".white-lamp");
const litLamp = document.querySelector(".yellow-lamp");
const onOffButton = document.getElementById("on-off-button");

onOffButton.addEventListener("click", function () {
  bodyElem.classList.toggle("background-black");
  unlitLamp.classList.toggle("display-none");
  litLamp.classList.toggle("display-block");
  if (onOffButton.innerHTML === "Off") {
    onOffButton.innerHTML = "On";
  } else {
    onOffButton.innerHTML = "Off";
  }
});
