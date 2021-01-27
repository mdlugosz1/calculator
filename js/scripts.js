const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operand');
const display = document.querySelector('.input-numbers');
const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');

let operator = '';
let input = {
    displayValue: '',
    storedValue: [],
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
        case '*':
            const multiply = input.storedValue.reduce((a, b) => a * b);
            input.storedValue = [multiply];
            display.textContent = input.storedValue;
            break;
        case '/':
            if (input.storedValue[1] === 0) {
                input.storedValue.splice(0, 2);
                display.textContent = 'DON\'\T DIVIDE BY 0';
            } else {
                const divide = input.storedValue.reduce((a, b) => a / b);
                input.storedValue = [divide];
                display.textContent = input.storedValue;
            }
            break;
    }
}

function populateDisplay(e) {
    if (input.displayValue.length <= 17) {
        input.displayValue += e.target.textContent;
        display.textContent = input.displayValue;
    }
}

function storeValue() {
    if (input.displayValue !== '') {
        input.storedValue.push(Number(input.displayValue));
        input.displayValue = '';
    }
}

function getOperator(e) {   
    if (input.storedValue.length === 0) {
        storeValue();
        operator = e.target.textContent;
    } else {
        storeValue();
        makeEquasion(operator, input);
        operator = e.target.textContent
    }
}

function makeEquasion() {
    if (input.storedValue.length !== 0) {
        storeValue();
        operate(operator, input);
    }
}

function setDefaultValues() {
    operator = ''
    input.displayValue = '';
    input.storedValue = [];
    display.textContent = '0';
}

numbers.forEach(number => number.addEventListener('click', populateDisplay));
operands.forEach(operand => operand.addEventListener('click', getOperator));
equals.addEventListener('click', makeEquasion);
clear.addEventListener('click', setDefaultValues);

