const prompt = require('prompt-sync')();

let A = Number(prompt("Informe o valor de A: "));
let B = Number(prompt("Informe o valor de B: "));
let C = Number(prompt("Informe o valor de C: "));
if (A < B + C) {
    console.log("Forma um triângulo.");
} else if (B < A + C) {
    console.log("Forma um triângulo.");
} else {
    console.log("Não forma um triângulo.");
}