const prompt = require('prompt-sync')();
let numero;
for(let i = 1; i < 5; i++) {
    numero = Number(prompt("Informe " +i+ "º número: "));
    console.log(numero);
}