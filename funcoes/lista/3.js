const prompt = require('prompt-sync')();

function media(n1, n2, n3){
    mediaNumero = (n1 + n2 + n3) / 3;
    return mediaNumero;
}

n1 = Number(prompt("Digite o primeiro número: "))
n2 = Number(prompt("Digite o segundo número: "))
n3 = Number(prompt("Digite o terceiro número: "))
console.log(media(n1, n2, n3))