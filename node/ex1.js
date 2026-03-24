const prompt = require('prompt-sync')();

let numero = Number(prompt("Informe um número: "));

if (numero % 2 == 0) {
    console.log("O número é par.");
} else {
    console.log("O número é ímpar.");
}