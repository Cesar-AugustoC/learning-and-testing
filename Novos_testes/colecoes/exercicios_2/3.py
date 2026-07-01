login_correto = {
    "usuario": "bebel",
    "senha": "17112024"
}

Login = {
    "usuario": input("Digite o nome do usuário: "),
    "senha": input("Digite a senha: ")
}

if Login["usuario"] == login_correto["usuario"] and Login["senha"] == login_correto["senha"]:
    print(f"acesso liberado para {login_correto['usuario']} ")
else:
    print(f"acesso negado para {Login['usuario']}")