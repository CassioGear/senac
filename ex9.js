const prompt = require('prompt-sync')();

let celsius = parseFloat(prompt("Digite a temperatura em graus Celsius: "));

let fahrenheit = (celsius * 9 / 5) + 32;

console.log("Temperatura em Fahrenheit: " + fahrenheit.toFixed(1) + "°F");

if (fahrenheit < 50) {
    console.log("Fahrenheit: " + fahrenheit + "°F - Frio");
} 
else if (fahrenheit >= 50 && fahrenheit <= 86) {
    console.log("Fahrenheit: " + fahrenheit + "°F - Temperatura agradável");
} 
else {
    console.log("Fahrenheit: " + fahrenheit + "°F - Muito quente");
}