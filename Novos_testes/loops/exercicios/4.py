""" 
def main():
	pizza = 0
	hamburguer = 0

	while True:
		print("Escolha uma opção:")
		print("1. Pizza")
		print("2. Hambúrguer")
		print("3. Sair")
		escolha = input("Digite o número da opção: ").strip()

		if escolha == '1':
			pizza += 1
			print("Voto registrado para Pizza.\n")
		elif escolha == '2':
			hamburguer += 1
			print("Voto registrado para Hambúrguer.\n")
		elif escolha == '3':
			break
		else:
			print("Opção inválida. Tente novamente.\n")

	print('\nResultado da votação:')
	print(f'Pizza: {pizza} voto(s)')
	print(f'Hambúrguer: {hamburguer} voto(s)')


if __name__ == '__main__':
	main()
 """

""" pizza = 0
hamburguer = 0
while True:
	voto = int(input("Vote: \n1. Pizza\n2. Hambúrguer\n3. Sair\nDigite o número da opção: "))
	if voto == 3:
		break
	elif voto == 1:
		pizza += 1
	elif voto == 2:
		hamburguer += 1
print(f'o total de votos para pizza foi: {pizza}')
print(f'o total de votos para hambúrguer foi: {hamburguer}') """

pizza = 0
hamburguer = 0
while True:
	voto = int(input("Vote: \n1. Pizza\n2. Hambúrguer\n3. Sair\nDigite o número da opção: "))
	match voto:
		case 1:
			pizza += 1
		case 2:
			hamburguer += 1
		case 3:
			break
		case _:
			print("Opção inválida. Tente novamente.")
print(f'o total de votos para pizza foi: {pizza}')
print(f'o total de votos para hambúrguer foi: {hamburguer}')