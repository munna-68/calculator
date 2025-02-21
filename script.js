const buttons = document.querySelectorAll('button');
const displayTextChain = document.querySelector('h3')
let topDisplay = [];

let blinkingEffect
if(topDisplay.length === 0) {
  startBlinking()
} 

function startBlinking() {
  let underscore = "_";
  blinkingEffect = setInterval(() => {
  if(underscore === "_"){
  displayTextChain.textContent = underscore;
  underscore = "";
  } else {
  displayTextChain.textContent = underscore;
  underscore = "_";
  }
  }, 500)
}

function stopBlinking() {
  displayTextChain.textContent = '';
  clearInterval(blinkingEffect);
}

buttons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    stopBlinking()
    topDisplay.push(event.target.textContent);
    console.log(typeof(event.target.textContent))
    if(event.target.textContent === "C") {
      startBlinking()
      topDisplay.length = 0;
      displayTextChain.textContent = topDisplay;
    } else {
    displayTextChain.textContent = topDisplay.join('')
    }
  })
})

function add(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multipication(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function operate(a, b, operator) {
  if(operator === '+') return add(a, b);
  if(operator === '-') return subtraction(a, b);
  if(operator === '*') return multipication(a, b);
  if(operator === '/') return division(a, b);
}