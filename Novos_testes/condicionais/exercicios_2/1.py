nota_do_filme = float(input('Digite a nota do filme (0 a 10): '))

if(nota_do_filme >= 9):
    print('Excelente! Este filme é altamente recomendado.')
elif(nota_do_filme >= 7):
    print('Muito bom! Vale a pena assistir.')
elif(nota_do_filme >= 5):
    print('Regular. Pode ser assistido, mas não é imperdível.')
else:
    print('Ruim. Talvez seja melhor escolher outro filme.')