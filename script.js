let currentExpression = '';
let currentResult = 0;
let lastResult = 0;
let currentSign = 1;

const expressionDisplay = document.getElementById('expression');
const resultDisplay = document.getElementById('result');

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        const operator = button.getAttribute('data-operator');
        const action = button.getAttribute('data-action');

        if (number !== null) {
            appendNumber(number);
        } else if (operator !== null) {
            appendOperator(operator);
        } else if (action !== null) {
            handleAction(action);
        }

        updateDisplay();
    });
});

function appendNumber(number) {
    currentExpression += number;
}

function appendOperator(operator) {
    if (operator === '√') {
        currentExpression += 'Math.sqrt(';
    } else {
        currentExpression += operator;
    }
}

function handleAction(action) {
    switch (action) {
        case 'clear':
            currentExpression = '';
            currentResult = 0;
            currentSign = 1;
            break;
        case 'delete':
            currentExpression = currentExpression.slice(0, -1);
            break;
        case 'ans':
            currentExpression += lastResult;
            break;
        case 'enter':
            try {
                currentResult = eval(currentExpression);
                lastResult = currentResult;
                currentExpression = '';
            } catch (error) {
                currentResult = 'Error';
            }
            break;
        case 'toggle-sign':
            toggleSign();
            break;
    }
}

function toggleSign() {
    if (currentExpression) {
        const lastChar = currentExpression[currentExpression.length - 1];
        if (!isNaN(lastChar)) {
            const newExpression = (-1 * parseFloat(currentExpression)).toString();
            currentExpression = newExpression;
        }
    }
}

function updateDisplay() {
    expressionDisplay.innerText = currentExpression;
    resultDisplay.innerText = currentResult || '0';
}
