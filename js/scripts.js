const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operator');
const screen = document.querySelector('.input-numbers');
const equals = document.querySelector('.equals');
const clear = document.querySelector('#clear');
const dot = document.querySelector('.dot');
const backspace = document.querySelector('#backspace');
const percent = document.querySelector('#percent');
const plusMinus = document.querySelector('.plus-minus');
const zero = document.querySelector('.zero');

let input = {
    operator: '',
    displayValue: '0',
    storedValue: [],
};

function showValue() {
    screen.textContent = input.displayValue;

    if (input.displayValue === '') {
        screen.textContent = input.storedValue;
    }

    if (screen.textContent.length > 14) {
        const before = input.storedValue[0];
        screen.textContent = before.toExponential(2);
    }
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
            obj.storedValue = [Number(divide.toFixed(6))];
            break;
    }
}

function populateDisplay(e) {
    if (e.keyCode === 32) {
        return false;
    }

    if (input.displayValue === '0') {
        input.displayValue = '';
    }

    if (input.displayValue.length < 12) {
        if (e.key) {
            input.displayValue += e.key;
        } else {
            input.displayValue += e.target.textContent;
        }
    }     

    showValue();
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
    } else {
        makeEquasion();
    }

    if (e.key) {
        input.operator = e.key;
    } else {
        input.operator = e.target.textContent;
    }
}

function makeEquasion() {
    if (input.storedValue.length !== 0) {
        storeValue();
        operate(input);
        
        if (isFinite(input.storedValue)) {
            showValue();
        } else {
            input.storedValue = [];
            screen.textContent = 'HELL NO!';
        }
    }
}

function setDefaultValues() {
    input.operator = ''
    input.displayValue = '0';
    input.storedValue = [];
    screen.textContent = '0';
}

function removeLastChar() {
    if (input.displayValue !== '') {
        const modifiedNumber = input.displayValue.slice(0, -1);
        input.displayValue = modifiedNumber;
        decimalCheck();
    } else if (input.displayValue === ''){
        const storedNumber = input.storedValue.toString();
        let nextStored = Number(storedNumber.slice(0, -1));
        input.storedValue = [nextStored];
    }

    showValue();
}

function toPercent() {
    let show = input.displayValue;
    let memory = input.storedValue;
    
    if (show !== '') {
        input.displayValue = Math.round((show / 100)*1000000000)/1000000000;
    } else if (show === '' && memory !== '') {
        input.storedValue = [Math.round((memory / 100)*1000000000)/1000000000];
    }

    if (isNaN(memory) || isNaN(show)) {
        screen.textContent = 0;
        input.storedValue = [];
    }
    
    showValue();
}

function negativePositive() {
    let show = input.displayValue;
    let memory = input.storedValue;
    
    if (show !== '') {
        if (show > 0) {
            input.displayValue = -show;
        } else {
            input.displayValue = Math.abs(show);
        }
    }

    if (show === '' && memory !== '') {
        if (memory > 0) {
            input.storedValue = [-memory];
        } else if (memory < 0){
            input.storedValue = [Math.abs(memory)];
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
