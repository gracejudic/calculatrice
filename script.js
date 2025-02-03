const BUTTONS_ELT = document.querySelectorAll('button');
const ERASE_ALL_ELT = document.getElementById('btn-c');

let displayCalculAreaElt = document.getElementById('display');
let arrayOfOperations = [];

// boucle for...of pour écouter chaque bouton et récupérer sa valeur au moment du clic + la conserver pour éviter
// de faire un event listener par bouton
for (const button of BUTTONS_ELT) {
    button.addEventListener('click', () => {
        // on affiche l'opération au fur et à mesure des clics
        displayCalculAreaElt.innerText += button.value;
        arrayOfOperations.push(button.value);
        // on appelle la fonction qui identifie l'opérateur utilisé seulement si "=" est cliqué
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

// fonction qui détermine l'opérateur utilisé (puis fonction de calcul à appeler), prend en paramètre un tableau
//contenant la valeur des boutons cliqués
function searchForOperator(myArray) {

    // tableau passé en string pour pouvoir utiliser les méthodes qui m'intéressent
    let myStringOfNumbersToCalcul = myArray.toString()


    // utilisation d'une regular expression pour éviter une switch case trop longue (rajout du flag g car 
    // je voulais pouvoir repérer tous les usages (si multiplication et addition en même temps par ex) j'ai pas réussi)
    // (j'ai oublié le %)
    let RegExp = /(\-|\+|\/|\*)(?=[^\-\+\/\*]*$)/g

    // méthode match pour stocker dans un tableau l'opérateur matchant ma regex et qui a été cliqué
    let operator = myStringOfNumbersToCalcul.match(RegExp)

    operator = operator.toString()

    // je split dans un tableau ma string en deux parties : une avant l'opérateur et une après, qui correspondent aux
    // nombres qu'on veut calculer
    let arrayOfNumbersToCalcul = myStringOfNumbersToCalcul.split(operator, 2)

    // j'enlève les virgules dans les deux tableaux pour reconstituer mes nombres
    let firstNum = arrayOfNumbersToCalcul[0].replace(/,/g, "")
    let secondNum = arrayOfNumbersToCalcul[1].replace(/,/g, "")

    firstNum = parseInt(firstNum)
    secondNum = parseInt(secondNum)
    
    // boucle switch sur l'opérateur pour appeler la fonction de calcul qui correspont au symbole et affichage du résultat
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