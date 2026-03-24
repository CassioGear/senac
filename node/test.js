const prompt = require('prompt-sync')();

//let nome = prompt('Qual é o seu nome? Informe-nos: ');

//let idade = Number(prompt('Qual é a sua idade? Informe-nos: '));

//console.log("Nome: " + nome + "; Idade: " + idade);

let n1 = Number(prompt('Informe a primeira nota: '));
let n2 = Number(prompt('Informe a segunda nota: '));

let soma = n1 + n2;
let media = soma / 2;
console.log("Sua média é: " + media);

if (media >= 7) {
  console.log("Aprovado");
} 
else if (media >= 3 && media < 7) {
  console.log("Recuperação");
} else {
  console.log("Reprovado");
}

console.log("A média é: " + media);
console.log("A soma é: " + soma);
