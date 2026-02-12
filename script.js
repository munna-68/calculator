const buttons = document.querySelectorAll('button');
const displayTextChain = document.querySelector('h3');
const bottomDisplay = document.querySelector('h2');

let topDisplay = [];
let currentValue = ''; // Holds the current number as a string
let lastResult = 0; // Store the last calculation result for 'ans' button

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
      topDisplay = [];
      currentValue = ''; // Reset current value
      displayTextChain.textContent = ''; // Clear the display
      bottomDisplay.textContent = '0'; // Clear the bottom display
    }
    // **Backspace Logic**
    else if (buttonValue === "<-") {
      if (currentValue.length > 0) {
        currentValue = currentValue.slice(0, -1);
        displayTextChain.textContent = topDisplay.join('') + currentValue;
      } else if (topDisplay.length > 0) {
        const lastItem = topDisplay.pop();
        if (!['+', '-', '*', '/'].includes(lastItem)) {
          currentValue = lastItem.slice(0, -1);
        }
        displayTextChain.textContent = topDisplay.join('') + currentValue;
      }
      if (topDisplay.length === 0 && currentValue === '') {
        startBlinking();
      }
    }
    // **Answer Button Logic (Recall Last Result)**
    else if (buttonValue === "ans") {
      currentValue += lastResult.toString();
      displayTextChain.textContent = topDisplay.join('') + currentValue;
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
        currentValue = '';
      }

      // Store the full expression for display
      const fullExpression = topDisplay.join('');

      // **Calculate the entire expression**
      if (topDisplay.length > 0) {
        try {
          // Parse and calculate the entire expression
          let result = calculateExpression(topDisplay);
          
          // **Display the Result**
          lastResult = result; // Store for 'ans' button
          bottomDisplay.textContent = result;
          displayTextChain.textContent = fullExpression;
          topDisplay = [result.toString()]; // Reset the display array with the result
          currentValue = ''; // Clear the current value
        } catch (error) {
          bottomDisplay.textContent = 'Error';
          topDisplay = [];
          currentValue = '';
        }
      }
    } 
    // **Number Handling (Appending Digits)**
    else {
      currentValue += buttonValue; // Append the clicked digit to currentValue
      displayTextChain.textContent = topDisplay.join('') + currentValue; // Update display
    }
  });
});

// **Calculate Expression with Proper Order of Operations**
function calculateExpression(tokens) {
  // Create a copy to avoid modifying original
  let expression = [...tokens];
  
  // First pass: Handle multiplication and division (left to right)
  let i = 0;
  while (i < expression.length) {
    if (expression[i] === '*' || expression[i] === '/') {
      const operand1 = parseFloat(expression[i - 1]);
      const operand2 = parseFloat(expression[i + 1]);
      const operator = expression[i];
      
      let result;
      if (operator === '*') {
        result = multiply(operand1, operand2);
      } else {
        result = divide(operand1, operand2);
      }
      
      // Replace the three elements (operand1, operator, operand2) with the result
      expression.splice(i - 1, 3, result.toString());
      i = 0; // Restart from beginning
    } else {
      i++;
    }
  }
  
  // Second pass: Handle addition and subtraction (left to right)
  i = 0;
  while (i < expression.length) {
    if (expression[i] === '+' || expression[i] === '-') {
      const operand1 = parseFloat(expression[i - 1]);
      const operand2 = parseFloat(expression[i + 1]);
      const operator = expression[i];
      
      let result;
      if (operator === '+') {
        result = add(operand1, operand2);
      } else {
        result = subtract(operand1, operand2);
      }
      
      // Replace the three elements with the result
      expression.splice(i - 1, 3, result.toString());
      i = 0; // Restart from beginning
    } else {
      i++;
    }
  }
  
  return parseFloat(expression[0]);
}

// **Basic Arithmetic Operations**
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}
