const prompt = require('prompt-sync')();

let i;
let opcao;

while (opcao !== 3) {
console.log("Opções disponiveis: 1 - Dizer olá. 2 - Mostrar data. 3 - Sair---");
opcao = Number(prompt("Digite a opção desejada: "));
if (opcao === 1) {
    console.log("Olá!");
} else if (opcao === 2) {
    console.log("Data: " + new Date());
}
else if (opcao === 3) {
    console.log("Saindo...");
} else {
    console.log("Opção inválida. Tente novamente.");
}
}