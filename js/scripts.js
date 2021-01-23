const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operands');
let display = document.querySelector('p');
let numbersInDispaly = '';

function operate(operator, firstNumber, secondNumber) {
    switch(operator) {
        case '+':
            firstNumber + secondNumber;
            break;
        case '-':
            firstNumber - secondNumber;
            break;
        case '*':
            firstNumber * secondNumber;
            break;
        case '/':
            firstNumber / secondNumber;
            break;
    }
}

function populateDisplay() {
    if (display.textContent.length < 17) {
        numbersInDispaly += this.textContent;
        return display.textContent = numbersInDispaly;
    }
}

numbers.forEach(number => number.addEventListener('click', populateDisplay));