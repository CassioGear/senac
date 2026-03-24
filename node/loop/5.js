const prompt = require("prompt-sync")();

let i = 0;
let soma = 0;
let media = 0;
let nota = 0;
let quantidade = 3;

for(i = 0; i < quantidade; i++) {
    nota = Number(prompt("Informe a nota: "));
    soma = soma + nota;
}

media = soma / quantidade;

console.log("A soma das notas é: " +soma);
console.log("A média das notas é: " +media);
console.log("A quantidade de notas é: " +quantidade);
console.log("A quantidade de notas é: " +i);