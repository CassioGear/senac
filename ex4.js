const prompt = require('prompt-sync')();

let peso = Number(prompt("Informe seu peso: "));

if (peso > 24.9) {
    console.log("Acima do peso.");
} else {
    if (peso >= 18.5 && peso <= 24.9) 
    console.log("Peso normal.");
    }
    if (peso < 18.5) {
    console.log("Abaixo do peso.");

}