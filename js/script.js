const bodyElem = document.getElementById("body");
const unlitLamp = document.querySelector(".white-lamp");
const litLamp = document.querySelector(".yellow-lamp");
const onOffButton = document.getElementById("on-off-button");

onOffButton.addEventListener("click", function () {
  if (onOffButton.innerHTML === "Off") {
    bodyElem.classList.remove("background-black");
    unlitLamp.classList.add("display-none");
    litLamp.classList.add("display-block");
    onOffButton.innerHTML = "On";
  } else {
    bodyElem.classList.add("background-black");
    unlitLamp.classList.remove("display-none");
    litLamp.classList.remove("display-block");
    onOffButton.innerHTML = "Off";
  }
});
