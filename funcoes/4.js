const prompt = require("prompt-sync")();
function usuario (nome){
    console.log(nome);
}

let nome = prompt("Informe o nome: ")
usuario(nome)
