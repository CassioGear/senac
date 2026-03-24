const prompt = require('prompt-sync')();


let valor = parseFloat(prompt("Digite o valor da compra:"));


if (valor > 100) {
   
    let desconto = valor * 0.10;
    let valorFinal = valor - desconto;
    console.log(`Desconto aplicado: R$ ${desconto.toFixed(2)}`);
    console.log(`Valor final com desconto: R$ ${valorFinal.toFixed(2)}`);
} else {
 
    console.log("Sem desconto aplicado.");
    console.log(`Valor final: R$ ${valor.toFixed(2)}`);
}