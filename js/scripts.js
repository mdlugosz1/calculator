const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operand');
const display = document.querySelector('.input-numbers');
const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');
const dot = document.querySelector('.dot');
const backspace = document.querySelector('#backspace');
const percent = document.querySelector('#percent');
const plusMinus = document.querySelector('.plus-minus');

let input = {
    operator: '',
    displayValue: '',
    storedValue: [],
};

function showValue() {
    display.textContent = input.displayValue;

    if (input.displayValue === '') {
        display.textContent = input.storedValue;
    }

    /* if (display.textContent.length >= 12) {
        const number = Number(display.textContent);
        display.textContent = number.toExponential();
    } */
}

function operate(obj) {
    switch (obj.operator) {
        case '+':
            const sum = obj.storedValue.reduce((a, b) => a + b);
            obj.storedValue = [sum];
            break;
        case '-':
            const substract = obj.storedValue.reduce((a, b) => a - b);
            obj.storedValue = [substract];
            break;
        case '*':
            const multiply = obj.storedValue.reduce((a, b) => a * b);
            obj.storedValue = [multiply];
            break;
        case '/':
            const divide = obj.storedValue.reduce((a, b) => a / b);
            obj.storedValue = [divide];
            break;
    }
}

function populateDisplay(e) {
    if (e.keyCode === 32) {
        return false;
    }

    if (input.displayValue.length <= 10) {
        if (e.key) {
            input.displayValue += e.key;
        } else {
            input.displayValue += e.target.textContent;
        }
        showValue();
    }     
}

function decimalCheck() {
    if (input.displayValue.includes('.')) {
        dot.removeEventListener('click', populateDisplay);
    } else {
        dot.addEventListener('click', populateDisplay);
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

        if (e.key) {
            input.operator = e.key;
        } else {
            input.operator = e.target.textContent;
        }
    } else {
        makeEquasion();

        if (e.key) {
            input.operator = e.key;
        } else {
            input.operator = e.target.textContent;
        }
    }
}

function makeEquasion() {
    if (input.storedValue.length !== 0) {
        storeValue();
        operate(input);
        showValue();

        if (input.storedValue == Infinity) {
            input.storedValue = [];
            display.textContent = 'HELL NO!';input.operator = '';
        }
    }
}

function setDefaultValues() {
    input.operator = ''
    input.displayValue = '';
    input.storedValue = [];
    display.textContent = '0';
}

function removeLastChar() {
    if (input.displayValue !== '') {
        const modifiedNumber = input.displayValue.slice(0, -1);
        input.displayValue = modifiedNumber;
        decimalCheck();
        showValue();
    } else if (input.displayValue === ''){
        const storedNumber = input.storedValue[0].toString();
        let nextStored = Number(storedNumber.slice(0, -1));
        input.storedValue = [nextStored];
        showValue();
    }

    if (input.storedValue[0] === '') {input.storedValue = [0];}
}

function toPercent() {
    let show = input.displayValue;
    let memory = input.storedValue[0];
    
    if (show !== '') {
        input.displayValue = show/100;
    } else if (show === '' && memory !== '') {
        input.storedValue[0] = memory/100;
    }

    showValue();
}

function negativePositive() {
    let show = input.displayValue;
    let memory = input.storedValue[0];
    
    if (show !== '') {
        if (show > 0) {
            input.displayValue = -show;
        } else {
            input.displayValue = Math.abs(show);
        }
    }

    if (show === '' && memory !== '') {
        if (memory > 0) {
            input.storedValue[0] = -memory;
        } else {
            input.storedValue[0] = Math.abs(memory);
        }
    }

    showValue();
}

function keyboardInput(e) {
    if ((e.key >= 0 && e.key < 10) || e.key === '.') {
        populateDisplay(e);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        getOperator(e);
    } else if (e.key === 'Backspace') {
        backspace.click();
    } else if (e.key === "Enter") {
        e.preventDefault();
        equals.click();
    } else if (e.key === 'Escape') {
        clear.click();
    } else if (e.key === ','){
        decimalCheck();
        dot.click();
    } 
}


numbers.forEach(number => number.addEventListener('click', populateDisplay));
operands.forEach(operand => operand.addEventListener('click', getOperator));
equals.addEventListener('click', makeEquasion);
clear.addEventListener('click', setDefaultValues);
backspace.addEventListener('click', removeLastChar);
percent.addEventListener('click', toPercent);
plusMinus.addEventListener('click', negativePositive);
dot.addEventListener('click', decimalCheck);
window.addEventListener('keydown', keyboardInput);
