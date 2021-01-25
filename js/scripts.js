const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operand');
const display = document.querySelector('p');
const equals = document.querySelector('.equals');

let operator = '';
let input = {
    displayValue : '',
    storedValue : [],
};

function operate(operator, input) {
    switch(operator) {
        case '+':
            const sum = input.storedValue.reduce((a, b) => a + b);
            input.storedValue = [sum];
            display.textContent = input.storedValue;
            break;
        case '-':
            const substract = input.storedValue.reduce((a, b) => a - b);
            input.storedValue = [substract];
            display.textContent = input.storedValue;
            break;
        /*case '*':
            const multiply = userInput.reduce((a, b) => a * b);
            console.log(multiply);
            break;
        case '/':
            const divide = userInput.reduce((a, b) => a / b);
            console.log(divide);
            break;*/
    }
}

function populateDisplay(e) {
    if (input.displayValue.length < 17) {
        input.displayValue += e.target.textContent;
        display.textContent = input.displayValue;
    }
}

function storeValue() {
    input.storedValue.push(Number(input.displayValue));
    input.displayValue = '';
}

function getOperator(e) {
    operator = e.target.textContent;
    storeValue();
}

function makeEquasion() {
    storeValue();
    operate(operator, input);
}

numbers.forEach(number => number.addEventListener('click', populateDisplay));
operands.forEach(operand => operand.addEventListener('click', getOperator));
equals.addEventListener('click', makeEquasion);

