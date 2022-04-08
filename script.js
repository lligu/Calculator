// Setup of the operations functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return Math.round((a * b) * 100) / 100;
}
function divide(a, b) {
    if (a === 0 || b === 0) {
        autoReset();
        return "Noope";
    } else {
        return Math.round((a / b) * 100) / 100;
    }
}
function module(a, b) {
    if (b === 0) {
        autoReset();
        return "Noope";
    } else {
        return Math.round((a % b) * 100) / 100;
    }
}
function operation(func, x, y) {
    return func(x, y);
}

// Creating a visual response to the user
// and an array with the inputs
const calcCurrent = document.querySelector('#calcCurrent');
calcCurrent.textContent = "";
let digitsArray = [];
isResult = false;
const calcButtons = document.querySelectorAll('.calcButton');
calcButtons.forEach((button) => {
    button.addEventListener('click', () => {
        buttonValue = button.textContent;
        if (isResult === true) {
            if (buttonValue.match(/[0-9]/)) {
                clear();
            }
            digitsArray.push(buttonValue);
            calcCurrent.textContent = digitsArray.join('');
            isResult = false;
        } else if (digitsArray[digitsArray.length - 1] === undefined) {
            if (buttonValue.match(/[0-9]/)) {
                digitsArray.push(buttonValue);
                calcCurrent.textContent = digitsArray.join('');
            }
        } else if (digitsArray[digitsArray.length - 1].match(/[0-9]/)) {
            if (buttonValue.match(/[0-9]/) || buttonValue === ".") {
                if (buttonValue === ".") {
                    if (!digitsArray[digitsArray.length - 1].includes(".")) {
                        digitsArray[digitsArray.length - 1] = `${digitsArray[digitsArray.length - 1]}` + `${buttonValue}`
                    }
                } else if (parseFloat(digitsArray[digitsArray.length - 1]) < 99999) {
                    digitsArray[digitsArray.length - 1] = `${digitsArray[digitsArray.length - 1]}` + `${buttonValue}`
                }
            } else {
                digitsArray.push(buttonValue);
            }
            calcCurrent.textContent = digitsArray.join('');
        } else if (buttonValue.match(/[0-9]/)) {
            digitsArray.push(buttonValue);
            calcCurrent.textContent = digitsArray.join('');
        } else if (buttonValue !== digitsArray[digitsArray.length - 1]) {
            digitsArray.pop();
            digitsArray.push(buttonValue);
            calcCurrent.textContent = digitsArray.join('');
        }
    });
})

// Setup of the clear button 
function clear() {
    digitsArray = [];
    calcCurrent.textContent = "";
    calcHistory.textContent = "";
}
function autoReset() {
    calculator = document.querySelector('#calculator');
    calculator.addEventListener('mousedown', clear, { once: true });
}
const clearButton = document.querySelector('#buttonClear');
clearButton.addEventListener('click', clear);

// Setup of the sign button 
const signButton = document.querySelector('#buttonSign');
signButton.addEventListener('click', () => {
    signNumber = parseFloat(digitsArray[digitsArray.length - 1]);
    if (signNumber > 0) {
        digitsArray[digitsArray.length - 1] = (-Math.abs(signNumber)).toString();
    } else if (signNumber < 0) {
        digitsArray[digitsArray.length - 1] = (Math.abs(signNumber)).toString();
    }
    calcCurrent.textContent = digitsArray.join('');
})

// Setup of the delete button
const delButton = document.querySelector('#buttonDel');
delButton.addEventListener('click', () => {
    lastDigit = digitsArray[digitsArray.length - 1];
    digitsArray[digitsArray.length - 1] = lastDigit.slice(0, -1);
    calcCurrent.textContent = digitsArray.join('');
})

// Elaborate the array
const findOperator1 = function (element) {
    if (element === "*" || element === "/" || element === "%") {
        return true;
    }
}
const findOperator2 = function (element) {
    if (element === "+" || element === "-") {
        return true;
    }
}
const calcHistory = document.querySelector('#calcHistory');
calcHistory.textContent = "";
const equalButton = document.querySelector('#buttonEqual');
equalButton.addEventListener('click', (e) => {
    calcHistory.textContent = `${calcHistory.textContent} ` + `${digitsArray.join('')}=`;
    e.stopPropagation();
    while (digitsArray.findIndex(findOperator1) !== -1) {
        foundIndex = digitsArray.findIndex(findOperator1);
        firstNumber = parseFloat(digitsArray[foundIndex - 1]);
        operator = digitsArray[foundIndex];
        secondNumber = parseFloat(digitsArray[foundIndex + 1]);
        if (operator === "*") {
            result = multiply(firstNumber, secondNumber);
        } else if (operator === "/") {
            result = divide(firstNumber, secondNumber);
        } else {
            result = module(firstNumber, secondNumber);
        }
        digitsArray[foundIndex - 1] = result;
        digitsArrayPt1 = digitsArray.slice(0, foundIndex);
        digitsArrayPt2 = digitsArray.slice(foundIndex + 2);
        digitsArray = digitsArrayPt1.concat(digitsArrayPt2);
    }
    while (digitsArray.findIndex(findOperator2) !== -1) {
        foundIndex = digitsArray.findIndex(findOperator2);
        firstNumber = parseFloat(digitsArray[foundIndex - 1]);
        operator = digitsArray[foundIndex];
        secondNumber = parseFloat(digitsArray[foundIndex + 1]);
        if (operator === "+") {
            result = add(firstNumber, secondNumber);
        } else {
            result = subtract(firstNumber, secondNumber);
        }
        digitsArray[foundIndex - 1] = result;
        digitsArrayPt1 = digitsArray.slice(0, foundIndex);
        digitsArrayPt2 = digitsArray.slice(foundIndex + 2);
        digitsArray = digitsArrayPt1.concat(digitsArrayPt2);
    }
    if (result > 9999999) {
        calcCurrent.textContent = "Nooope";
        autoReset;
    } else {
        calcCurrent.textContent = digitsArray.join('');
    }
    isResult = true;
})

// Look at https://rlmoser99.github.io/calculator/
// for more cool features