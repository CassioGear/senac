const prompt = require('prompt-sync')();

let i;
let nome;
let idade = 0                                                                       
let altura;
let peso;
for(i = 0; i < 5; i++) {
    nome = prompt("Informe o " +i+ "º nome: ");
    idade = Number(prompt("Informe a " +i+ "ª idade: "));
    altura = Number(prompt("Informe a " +i+ "ª altura: "));
    peso = Number(prompt("Informe a " +i+ "ª peso: "));
}