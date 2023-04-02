let currentValue = "0";
let previousValue = null;
let operator = null;
let shouldClearCurrentValue = false;

function updateDisplay() {
  document.getElementById("current-value").innerText = currentValue;
  if (previousValue != null) {
    document.getElementById("previous-value").innerText =
      previousValue + " " + operator;
  } else {
    document.getElementById("previous-value").innerText = "";
  }
}

function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  shouldClearCurrentValue = false;
  updateDisplay();
}

function clearCurrent() {
  currentValue = "0";
  updateDisplay();
}

function backspace() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = "0";
  }
  updateDisplay();
}

function appendNumber(number) {
  if (shouldClearCurrentValue) {
    currentValue = "0";
    shouldClearCurrentValue = false;
  }
  if (number === "." && currentValue.includes(".")) {
    return;
  }
  if (currentValue === "0" && number !== ".") {
    currentValue = number;
  } else {
    currentValue += number;
  }
  updateDisplay();
}

function appendOperator(newOperator) {
  if (operator != null) {
    calculate();
  }
  shouldClearCurrentValue = true;
  if (currentValue === "0") {
    previousValue = "0";
  } else {
    previousValue = currentValue;
  }
  currentValue = "0";
  operator = newOperator;
  updateDisplay();
}

function calculate() {
  if (operator == null) {
    return;
  }
  let result;
  const previous = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  switch (operator) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "x":
      result = previous * current;
      break;
    case "÷":
      result = previous / current;
      break;
    case "%":
      result = previous % current;
      break;
    default:
      return;
  }
  currentValue = result.toString();
  previousValue = null;
  operator = null;
  updateDisplay();
}

function handleInput(input) {
  if (isNaN(input) && input !== ".") {
    appendOperator(input);
  } else {
    appendNumber(input);
  }
}

function handleEquals() {
  calculate();
}

function handleClear() {
  if (currentValue === "0" && previousValue === null && operator === null) {
    clearAll();
  } else {
    clearCurrent();
  }
}

function handleBackspace() {
  backspace();
}
