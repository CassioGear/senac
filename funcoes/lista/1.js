const prompt = require('prompt-sync')();

function usuario(nome) {
  console.log("Bem-vindo, " + nome + "!");
}

let nome = prompt('Digite seu nome: ');
usuario(nome);
