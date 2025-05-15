programa {
  funcao inicio() {
    inteiro nascimento, atual, idade
    escreva("Seu ano de nascimento: ")
    leia(nascimento)
    escreva("Digite o ano atual: ")
    leia(atual)
    idade = atual-nascimento
    se(idade>18){
      escreva("Pode vir!")
    }senao{
      escreva("Sai daqui mlk")
    }
  }
}
