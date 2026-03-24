const prompt = require('prompt-sync')();

console.log("--- BEM-VINDO AO CAIXA ---");

let nomeCliente;
let atendente;
let tipoLanche;
let tamanhoLanche;
let bebida;
let sobremesa;
let formaPagamento;
let cupom;
let valorPago;
let precoLanche = 0;
let precoBebida = 0;
let precoSobremesa = 0;
let desconto = 0;
let taxa = 0;
let totalFinal = 0;
let troco = 0;
let subtotal = 0;

nomeCliente = prompt("Nome do cliente: ");
atendente = prompt("Nome do atendente: ");
tipoLanche = prompt("Tipo do lanche (XIS, HAMBURGUER, HOTDOG): ")
tamanhoLanche = prompt("Tamanho (Pequeno, Médio, Grande): ")
bebida = prompt("Bebida (AGUA, REFRI, SUCO): ")
sobremesa = prompt("Sobremesa (NENHUMA, SORVETE, PUDIM): ")
formaPagamento = prompt("Forma de pagamento (PIX, DINHEIRO, CARTAO): ")
cupom = prompt("Cupom (NENHUM, ALUNO10, FRETEGRATIS): ")
valorPago = parseFloat(prompt("Valor pago pelo cliente: "));

if (tipoLanche === "XIS") {
    if (tamanhoLanche === "Pequeno") precoLanche = 18;
    else if (tamanhoLanche === "Médio") precoLanche = 24;
    else if (tamanhoLanche === "Grande") precoLanche = 30;
} else if (tipoLanche === "HAMBURGUER") {
    if (tamanhoLanche === "Pequeno") precoLanche = 16;
    else if (tamanhoLanche === "Médio") precoLanche = 21;
    else if (tamanhoLanche === "Grande") precoLanche = 27;
} else if (tipoLanche === "HOTDOG") {
    if (tamanhoLanche === "Pequeno") precoLanche = 12;
    else if (tamanhoLanche === "Médio") precoLanche = 16;
    else if (tamanhoLanche === "Grande") precoLanche = 20;
}

if (bebida === "AGUA") precoBebida = 5;
else if (bebida === "REFRI") precoBebida = 8;
else if (bebida === "SUCO") precoBebida = 10;

if (sobremesa === "SORVETE") precoSobremesa = 9;
else if (sobremesa === "PUDIM") precoSobremesa = 11;

subtotal = precoLanche + precoBebida + precoSobremesa;

if (cupom === "ALUNO10") {
    desconto = subtotal * 0.10;
} else if (cupom === "FRETEGRATIS") {
    desconto = 5;
}

if (formaPagamento === "CARTAO") {
    taxa = subtotal * 0.03;
}

totalFinal = subtotal - desconto + taxa;
troco = valorPago - totalFinal;

console.log("\n========================================");
console.log("          COMPROVANTE DE VENDA          ");
console.log("========================================");
console.log("Cliente:" + nomeCliente);
console.log("Atendente: " + atendente);
console.log("Lanche: " + tipoLanche + " (" + tamanhoLanche + ")");
console.log("Bebida: " + bebida);
console.log("Sobremesa: " + sobremesa);
console.log("----------------------------------------");
console.log("Subtotal: R$ " + subtotal);
console.log("Cupom aplicado: " + cupom);
console.log("Valor do desconto: R$ " + desconto);
console.log("Taxa de pagamento: R$ " + taxa);
console.log("TOTAL FINAL: R$ " + totalFinal);
console.log("----------------------------------------");
console.log("Valor Pago: R$ " + valorPago);
console.log("Troco: R$ " + troco);
console.log("----------------------------------------");
console.log("   Obrigado pela preferência! Volte sempre!   ");
console.log("========================================\n");