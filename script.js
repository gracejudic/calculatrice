const BUTTONS_ELT = document.querySelectorAll('button');
const ERASE_ALL_ELT = document.getElementById('btn-c');

let displayCalculAreaElt = document.getElementById('display');
let arrayOfOperations = [];

for (const button of BUTTONS_ELT) {
    button.addEventListener('click', () => {
        displayCalculAreaElt.innerText += button.value;
        arrayOfOperations.push(button.value);
        if (button.value == "=") {
            searchForOperator(arrayOfOperations);
        }
    })
}

function clearDisplay() {
    ERASE_ALL_ELT.addEventListener('click', () => {
        displayCalculAreaElt.innerText = '';
        arrayOfOperations = [];
    })
}

function sum(num1,num2) {
    return num1 + num2
}

function multiply(num1,num2) {
    return num1 * num2
}

function subtract(num1,num2) {
    return num1 - num2
}

function divide(num1,num2) {
    return num1 / num2
}

function percent(num1,num2) {
    return ((num1 * num2)/100)
}

function searchForOperator(myArray) {
    let myStringOfNumbersToCalcul = myArray.toString()
    let RegExp = /(\-|\+|\/|\*)(?=[^\-\+\/\*]*$)/g

    let operator = myStringOfNumbersToCalcul.match(RegExp)
    operator = operator.toString()

    let arrayOfNumbersToCalcul = myStringOfNumbersToCalcul.split(operator, 2)

    let firstNum = arrayOfNumbersToCalcul[0].replace(/,/g, "")
    let secondNum = arrayOfNumbersToCalcul[1].replace(/,/g, "")

    firstNum = parseInt(firstNum)
    secondNum = parseInt(secondNum)
    
    switch (operator) {
        case "+": 
            displayCalculAreaElt.innerText += sum(firstNum,secondNum);
            break;         
        case "*":
            displayCalculAreaElt.innerText += multiply(firstNum,secondNum);
            break;
        case "-":
            displayCalculAreaElt.innerText += subtract(firstNum,secondNum);
            break;
        case "/": 
            displayCalculAreaElt.innerText += divide(firstNum,secondNum);
            break;
        case "%":
            displayCalculAreaElt.innerText += percent(firstNum,secondNum);
            break;
    }

}