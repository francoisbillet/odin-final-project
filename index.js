const add = (a, b) => {
  return Number(a) + Number(b);
};

const subtract = (a, b) => {
  return Number(a) - Number(b);
};

const multiply = (a, b) => {
  return Number(a) * Number(b);
};

const divide = (a, b) => {
  if (Number(b) === 0) {
    console.error("Can't divide by 0");
    return "ERROR";
  }
  return Number(a) / Number(b);
};

const isNumberTooLong = (number) => {
  return (
    String(number).includes(".") && String(number).split(".")[1].length > 10
  );
};

const shortenDecimalPart = (number) => {
  return number.toFixed(4);
};

const operate = (operator, a, b) => {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      return "ERROR";
  }
};

// Selecting Elements

const resultDisplay = document.querySelector(".result-display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equals");
const clear = document.querySelector(".clear");

// Setting variables

let userInput = "";
let firstOperand = "";
let operator;

// Event Listeners

// Digits
const displayDigitClick = (event) => {
  userInput += event.target.textContent;
  resultDisplay.textContent += event.target.textContent;
};

digits.forEach((digit) => digit.addEventListener("click", displayDigitClick));

// Operators
const setOperator = (event) => {
  if (userInput && firstOperand) {
    let result = operate(operator, firstOperand, userInput);
    if (isNumberTooLong(result)) {
      result = shortenDecimalPart(result);
    }
    firstOperand = result;
    userInput = "";
    operator = event.target.textContent;
    resultDisplay.textContent = `${result} ${operator} `;
  } else {
    operator = event.target.textContent;
    firstOperand = userInput;
    userInput = "";
    resultDisplay.textContent += ` ${event.target.textContent} `;
  }
};

operators.forEach((operator) =>
  operator.addEventListener("click", setOperator)
);

// Equals
const displayResult = () => {
  if (!operator && !firstOperand) return userInput;
  let result = operate(operator, firstOperand, userInput);
  if (isNumberTooLong(result)) {
    result = shortenDecimalPart(result);
  }
  userInput = result;
  firstOperand = "";
  resultDisplay.textContent = result;
};

equal.addEventListener("click", displayResult);

// Clear
const clearEntry = () => {
  userInput = "";
  firstOperand = "";
  operator = null;
  resultDisplay.textContent = "";
};

clear.addEventListener("click", clearEntry);
