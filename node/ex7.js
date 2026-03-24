const prompt = require('prompt-sync')();

let name = prompt("Informe seu nome de acesso: ");

if (name == "admin") {
    console.log("Bem-vindo, admin!");
} else {
    console.log("Acesso negado.");
}