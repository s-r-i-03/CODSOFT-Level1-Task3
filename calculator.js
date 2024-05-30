document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentValue = '';
    let operator = '';
    let num1 = '';
    let num2 = '';
    let isOperatorClicked = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (buttonText === 'C') {
                display.value = '';
                currentValue = '';
                num1 = '';
                num2 = '';
                operator = '';
                isOperatorClicked = false;
            } else if (buttonText === '=') {
                if (num1 && currentValue && operator) {
                    num2 = currentValue;
                    const result = calculate(num1, num2, operator);
                    display.value = result;
                    currentValue = result;
                    num1 = '';
                    num2 = '';
                    operator = '';
                    isOperatorClicked = false;
                }
            } else if (buttonText === '.') {
                if (!currentValue.includes('.')) {
                    currentValue += buttonText;
                    display.value += buttonText;
                }
            } else if (['+', '-', '*', '/'].includes(buttonText)) {
                if (currentValue) {
                    if (num1 && operator) {
                        num2 = currentValue;
                        const result = calculate(num1, num2, operator);
                        num1 = result;
                        display.value = num1 + ' ' + buttonText + ' ';
                    } else {
                        num1 = currentValue;
                        display.value = num1 + ' ' + buttonText + ' ';
                    }
                    operator = buttonText;
                    currentValue = '';
                    isOperatorClicked = true;
                }
            } else {
                if (isOperatorClicked) {
                    display.value += buttonText;
                    currentValue = buttonText;
                    isOperatorClicked = false;
                } else {
                    currentValue += buttonText;
                    display.value += buttonText;
                }
            }
        });
    });

    function calculate(num1, num2, operator) {
        let result = 0;
        switch (operator) {
            case '+':
                result = parseFloat(num1) + parseFloat(num2);
                break;
            case '-':
                result = parseFloat(num1) - parseFloat(num2);
                break;
            case '*':
                result = parseFloat(num1) * parseFloat(num2);
                break;
            case '/':
                result = parseFloat(num1) / parseFloat(num2);
                break;
        }
        return result.toString();
    }
});
