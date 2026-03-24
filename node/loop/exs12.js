const prompt = require('prompt-sync')();

let i;
let idade;
let nome;
let quant = 3;
let media;
let soma = 0;
let quantMaiores = 0;

for(i = 0; i < quant; i++) {
nome = prompt("Digite o nome da pessoa: ");
idade = Number(prompt("Digite a idade da pessoa: "));
soma = soma + idade;

if(idade >= 18) {
    console.log(nome + " é maior de idade.");
    quantMaiores++;
} else {
    console.log(nome + " é menor de idade.");
}
}
media = soma / quant;
console.log("A média das idades é: " + media);
console.log("A quantidade de pessoas maiores de idade é: " + quantMaiores);
