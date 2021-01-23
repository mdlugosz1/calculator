const numbers = document.querySelectorAll('.numbers');
const operands = document.querySelectorAll('.operands');
let display = document.querySelector('p');
let numbersInDispaly = '';

function inputNumbers() {
    numbers.forEach(number => {
        number.addEventListener('click', () => {
            if (display.textContent.length < 17) {
                numbersInDispaly += number.textContent;
                display.textContent = numbersInDispaly;
            }
        });
    })
}

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

inputNumbers();