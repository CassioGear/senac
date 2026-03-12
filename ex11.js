const prompt = require('prompt-sync')();

let speed = Number(prompt("Velocidade do carro: "));

if (speed < 60) {
    console.log("Dentro do limite de velocidade.");
} else {
    if (speed >= 60 && speed <= 80) 
        console.log("Leve.");
    }
    if (speed > 80) {
    console.log("Fora do limite de velocidade.");

}