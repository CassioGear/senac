const prompt = require('prompt-sync')();

let maior = -Infinity;

for (let i = 1; i <= 5; i++) {
    let numero = parseFloat(prompt("Digite o " + i + "º número:"));


    if (numero > maior) {
        maior = numero;
    }

    console.log("O maior número digitado até agora é: " + maior);
}
