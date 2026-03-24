const prompt = require('prompt-sync')();

let opcao;

console.log("Opções:1 - Oi. 2 - Tchau. 3 - Tudo bem?");
opcao = Number(prompt("Digite a sua opção: "));

switch (opcao) {
    case 1:
        console.log("Oi.");
        break;
    case 2:
        console.log("Tchau.");
        break;
    case 3:
        console.log("Tudo bem?");
        break;
    default:
        console.log("Opção inválida.");
}
