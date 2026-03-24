const prompt = require('prompt-sync')();

let i;
let voto = 0;
let a = 0;
let b = 0;
let c = 0;

console.log("-----Candidatos-----");
console.log("\n1- Candidato A");
console.log("2- Candidato B");
console.log("3- Candidato C");
console.log("0 - Encerra a votação");

do{
voto = Number(prompt("Informe o número do candidato para votar: "));

if(voto === 1) {
     console.log("Voto para o candidato A");
    a++;
} else if(voto === 2) {
    console.log("Voto para o candidato B");
    b++;
} else if(voto === 3) {
    console.log("Voto para o candidato C");
    c++;
}
else if(voto === 4) {
    console.log("Votação encerrada.");
}
else {
    console.log("Voto inválido. Tente novamente.");
}
}while(voto != 0);
