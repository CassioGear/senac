const prompt = require('prompt-sync')();

let senha;

do{
    senha = prompt("Digite a senha: ");
    if(senha === "123456"){
        console.log("Acesso permitido.");
    } else {
        console.log("Acesso negado. Tente novamente.");
    }
} while (senha !== "123456");
