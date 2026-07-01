opção = input('Escolha um item do cardápio (pizza, sushi, salada): ').lower()

match opção:
    case 'pizza':
        print('Você escolheu pizza!')
    case 'sushi':
        print('Você escolheu sushi!')
    case 'salada':
        print('Você escolheu salada!')
    case _:
        print('Opção inválida!')