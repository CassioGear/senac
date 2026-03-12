const prompt = require('prompt-sync')();

let A = Number(prompt("Informe o valor de A: "));
let B = Number(prompt("Informe o valor de B: "));
let C = Number(prompt("Informe o valor de C: "));

if (A == B && A == C) {
    console.log("É um equilátero.");
} 

else if (A == C && A !== B) {
    console.log("É um isósceles.");
} 

else if (B !== C && B !== A) {
    console.log("Não forma um triângulo.");
}
else{

}