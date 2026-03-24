const prompt = require('prompt-sync')();

let salario = parseFloat(prompt("Digite o salário do funcionário:"));
let bonus;

if (salario <= 2000) {
    bonus = salario * 0.15; 
} 
else if (salario > 2000 && salario <= 5000) {
    bonus = salario * 0.10; 
} 
else {
    bonus = salario * 0.05; 
}

let novoSalario = salario + bonus;

alert("Valor do bônus: R$ " + bonus.toFixed(2));
alert("Novo salário com bônus: R$ " + novoSalario.toFixed(2));

console.log("Salário base: R$", salario);
console.log("Bônus aplicado: R$", bonus);
console.log("Total: R$", novoSalario);