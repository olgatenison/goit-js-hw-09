const elements = {
  body: document.querySelector('body'),
  start: document.querySelector('button[data-start]'),
  stop: document.querySelector('button[data-stop]'),
};
console.log(elements.body);
console.log(elements.stop);
console.log(elements.start);

let intervalId;

//generaite random color
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
//add to elem random color
function addRandomHexColor() {
  elements.body.style.backgroundColor = getRandomHexColor();
}

//run the functions every 1000 ms
elements.start.addEventListener('click', () => {
  intervalId = setInterval(addRandomHexColor, 1000);
  elements.start.disabled = true; // Робимо кнопку "Start" неактивною
  elements.stop.disabled = false; // Робимо кнопку "Stop" активною
});

//stop generaiting function
elements.stop.addEventListener('click', () => {
  clearInterval(intervalId);
  elements.start.disabled = false; // Робимо кнопку "Start" активною
  elements.stop.disabled = true; // Робимо кнопку "Stop" неактивною
});
