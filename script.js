const container = document.querySelector("#container");
const search = document.querySelector("#search");

document.addEventListener("keydown", event => {
  if(document.activeElement !== search) {
    search.value = "";
    search.focus();
  }
});
function go() {
  // on enter
  if(event.keyCode == 13) {
    window.location.assign(search.value)
  }
  // on escape
  if(event.keyCode == 27) {
    search.value = "";
  }
}

function resizeContainer() {
  let size = 200
  if(window.innerHeight < 400) {
    size = window.innerHeight/2-25
  }
  container.setAttribute("style", `padding-top: ${size}px`);
}

window.onresize = resizeContainer;
resizeContainer()
