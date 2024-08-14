let display = document.getElementById('display');
let currentInput = '';
let currentOperator = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    updateDisplay(currentInput);
}

function appendOperator(operator) {
    if (currentInput === '' && previousInput === '') return;

    if (currentInput !== '') {
        if (previousInput === '') {
            previousInput = currentInput;
        } else {
            previousInput = calculate(previousInput, currentInput, currentOperator);
        }
    }

    currentOperator = operator;
    currentInput = '';
    updateDisplay(previousInput + ' ' + currentOperator);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    updateDisplay('0');
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || '0');
}

function calculateResult() {
    if (currentInput === '' || previousInput === '') return;

    let result = calculate(previousInput, currentInput, currentOperator);
    updateDisplay(result);
    previousInput = result;
    currentInput = '';
    currentOperator = '';
}

function calculate(num1, num2, operator) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num2 !== 0 ? num1 / num2 : 'Error';
        default:
            return num2;
    }
}

function updateDisplay(value) {
    display.innerText = value;
}
