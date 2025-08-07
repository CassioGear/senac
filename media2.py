nota1 = float(input("Digite a nota da prova: "))
nota2 = float(input("Digite a nota do trabalho: "))
nota3 = float(input("Digite a nota da participação em aula: "))
media = (nota1 + nota2 + nota3)/3
print("Média ",media)
if(media >= 9):
    print("Sua nota é PD.")
elif(media >= 8):
    print("Sua nota é D.")
elif(media >= 7):
    print("Sua nota é ED.")
else:
    print("Sua nota é ND.")