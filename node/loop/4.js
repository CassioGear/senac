const prompt = require("prompt-sync")();
let i;
let numero = 0;
let soma = 0;

for(i = 0; i < 4; i++) {
    numero = Number(prompt("Informe a posição " +i+ ": "));
    soma = soma + numero;
    console.log(soma);
}