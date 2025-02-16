






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