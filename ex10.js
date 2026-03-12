const prompt = require('prompt-sync')();

let product = Number(prompt("Produto: "));

if (product <= 50) {
    console.log("Produto básico.");
} else {
    if (product >= 51 && product <= 200) 
        console.log("Intermediário.");
    }
    if (product > 200) {
    console.log("Produto avançado.");

}