const prompt = require('prompt-sync')();

let hora = Number(prompt("Hora atual: "));

if (hora > 18) {
    console.log("Estabelecimento fechado.");
} else {
    if (hora > 8 && hora < 18) 
        console.log("Horario comercial.");
    }
    if (hora < 8) {
    console.log("Fora do horario comercial.");

}