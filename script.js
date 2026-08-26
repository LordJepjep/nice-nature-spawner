function handleClick(event) {
  const x = event.clientX;
  const y = event.clientY;
  console.log(`X: ${x}\nY: ${y}`);
}

console.log("start");
const mainDiv = document.getElementById("main");
mainDiv.addEventListener("click", handleClick);
