const prompt = require('prompt-sync')();

let i;
let numero;
let mult;

    numero = Number(prompt("Digite um número: "));
    for(i = 1; i < 10; i++) {
    mult = numero * i;
    console.log(numero + " x " + i + " = " + mult);
}
