programa {
  funcao inicio() {
    //Variavéis
    inteiro valor, quantidade, total
    cadeia nome, codigo
    escreva("Digite o nome da peça: ")
    leia(nome)
    escreva("Digite o código da peça: ")
    leia(codigo)
    escreva("Digite o valor da peça: ")
    leia(valor)
    escreva("Digite a quantidade de peças: ")
    leia(quantidade)
    total = valor*quantidade
    escreva("O Valor Total é: ",total)
  }
}
