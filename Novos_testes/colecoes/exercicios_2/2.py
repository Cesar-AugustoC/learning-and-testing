usuario = {
    "nome": input("Digite o nome do usuário: "),
    "idade": int(input("Digite a idade do usuário: ")),
}

if usuario["idade"] >= 18:
    print(f"acesso liberado para {usuario['nome']}.")
else:
    print(f"acesso negado para {usuario['nome']}.")