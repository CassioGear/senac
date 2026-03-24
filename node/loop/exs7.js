const prompt = require('prompt-sync')();

let i;
let numero = 0;
let par = 0;
let impar = 0;

for(let i = 0; i < 4; i++) {
    numero = Number(prompt("Digite um número: "));
    if (numero % 2 === 0) {
        par++;
    } else {
        impar++;
    }
}
console.log("Par: " + par);
console.log("Ímpar: " + impar);