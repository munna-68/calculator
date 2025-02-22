const buttons = document.querySelectorAll('button');
const displayTextChain = document.querySelector('h3');
const bottomDisplay = document.querySelector('h2');

let topDisplay = [];
let currentValue = ''; // Holds the current number as a string

let blinkingEffect;
if (topDisplay.length === 0) {
  startBlinking();
}

function startBlinking() {
  let underscore = "_";
  blinkingEffect = setInterval(() => {
    if (underscore === "_") {
      displayTextChain.textContent = underscore;
      underscore = "";
    } else {
      displayTextChain.textContent = underscore;
      underscore = "_";
    }
  }, 500);
}

function stopBlinking() {
  displayTextChain.textContent = '';
  clearInterval(blinkingEffect);
}

buttons.forEach(btn => {
  btn.addEventListener('click', (event) => {
    stopBlinking();
    const buttonValue = event.target.textContent;

    // **Reset Logic for 'C' (Clear) Button**
    if (buttonValue === "C") {
      startBlinking();
      topDisplay.length = 0;
      currentValue = ''; // Reset current value
      displayTextChain.textContent = ''; // Clear the display
    } 
    // **Operator Handling** (Before pressing an operator, combine the current number)
    else if (['+', '-', '*', '/'].includes(buttonValue)) {
      if (currentValue !== '') {
        topDisplay.push(currentValue); // Push the complete number as a string to the array
        currentValue = ''; // Reset currentValue for the next number
      }
      topDisplay.push(buttonValue); // Push the operator to the array
      displayTextChain.textContent = topDisplay.join(''); // Update display with the current input
    }
    // **Equal Button Logic (Calculate Result)**
    else if (buttonValue === "=") {
      if (currentValue !== '') {
        topDisplay.push(currentValue); // Push the last entered number before calculation
      }

      // **Find Operator Index to Perform Operation**
      let operatorIndex = -1;
      for (let i = 0; i < topDisplay.length; i++) {
        if (['+', '-', '*', '/'].includes(topDisplay[i])) {
          operatorIndex = i; // Store operator index
          break; // Stop once we find the first operator
        }
      }

      // **Extract Operands and Perform the Operation**
      if (operatorIndex !== -1) {
        const operand1 = parseFloat(topDisplay[operatorIndex - 1]);
        const operand2 = parseFloat(topDisplay[operatorIndex + 1]);
        const operator = topDisplay[operatorIndex];

        let result;
        switch (operator) {
          case '+':
            result = add(operand1, operand2);
            break;
          case '-':
            result = subtraction(operand1, operand2);
            break;
          case '*':
            result = multipication(operand1, operand2);
            break;
          case '/':
            result = division(operand1, operand2);
            break;
          default:
            break;
        }

        // **Display the Result and Reset for Next Input**
        bottomDisplay.textContent = result;
        displayTextChain.textContent = result;
        topDisplay = [result.toString()]; // Reset the display array with the result
        currentValue = ''; // Clear the current value
      }
    } 
    // **Number Handling (Appending Digits)**
    else {
      currentValue += buttonValue; // Append the clicked digit to currentValue
      displayTextChain.textContent = topDisplay.join('') + currentValue; // Update display
    }
  });
});

// **Basic Arithmetic Operations**
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
