const prompt = require('prompt-sync')();

let pass = Number(prompt("Informe sua senha de acesso: "));

if (pass === 1234) {
    console.log("Acesso permitido.");
} else {
    console.log("Acesso negado.");
}