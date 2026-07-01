# nota_minima = 7
# nota_aluno = float(input("Digite a nota do aluno: "))
# if(nota_aluno >= nota_minima):
#     print('Parabéns, você passou de ano!')
# elif(nota_aluno >= 5):
#     print('Você ficou de recuperação, estude mais!')
# else:
#     print('Infelizmente, você não passou de ano.')  

# numero = float(input('Digite um número: '))
# if(numero % 2 == 0):
#     print('O número é par.')
# else:
#     print('O número é ímpar.')

idade_minima = 18
idade_usuario = int(input('Digite a sua idade: '))

if(idade_usuario >= idade_minima):
    print('Você tem idade suficiente para dirigir.')

    tem_carteira = input('Você tem carteira de motorista? (sim/não): ').lower()

    if(tem_carteira == 'sim'):
        print('Ótimo! Você pode dirigir com segurança.')
    else:
        print('Você precisa obter uma carteira de motorista para dirigir legalmente.')
else:
    print('Desculpe, você ainda não tem idade suficiente para dirigir.')