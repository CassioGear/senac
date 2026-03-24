const prompt = require('prompt-sync')();

let soma = 0;
let numero;
let quant = 0;

do {
    numero = Number(prompt("Digite um número (0 para sair): "));
    soma = numero + soma;

    if (numero !== 0) {
        quant++;
    }

} while (numero !== 0);

console.log("A soma dos números é: " + soma);
console.log("A quantidade de números digitados é: " + quant);
