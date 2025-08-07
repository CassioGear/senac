nota1 = float(input("Digite a nota da prova: "))
nota2 = float(input("Digite a nota do trabalho: "))
media = (nota1 + nota2)/2
print("Média ",media)
if(media >= 9):
    print("Sua nota é PD.")
else:
    print("Sua nota é ED.")