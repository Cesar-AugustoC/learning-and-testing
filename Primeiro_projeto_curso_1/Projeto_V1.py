""" O que seu programa deve fazer:
Exibir um menu com as opções:
1. Adicionar aluno
2. Listar todos os alunos
3. Buscar aluno pelo nome
4. Remover aluno
5. Mostrar média geral das notas
6. Sair """

# primeiramente vou criar um dicionário para armazenas as opções do menu, onde a chave será o número da opção e o valor será a função que será executada quando a opção for escolhida.

opções_do_menu = {
    1: "adicionar_aluno",
    2: "listar_alunos",
    3: "buscar_aluno",
    4: "remover_aluno",
    5: "mostrar_media_geral",
    6: "sair"
}

# criar uma lista para armazenar os alunos, onde cada aluno será representado por um dicionário contendo o nome e a nota do aluno.
alunos = []

# def função para adicionar aluno
def adicionar_aluno():
    nome = input("Digite o nome do aluno: ")
    idade = int(input("Digite a idade do aluno: "))
    nota = int(input("Digite a nota do aluno de 0 a 10: "))
    aluno = {"nome": nome, "idade": idade, "nota": nota}
    alunos.append(aluno)
    print(f"Aluno {nome} adicionado com sucesso!")

while True:
    print(opções_do_menu)
    opção_escolhida = int(input("Escolha uma opção: "))
    if opção_escolhida == 6:
        print("Saindo do programa...")
        break
    elif opção_escolhida == 1:
        adicionar_aluno()
    elif opção_escolhida == 2:
        print(f"Lista de alunos: {alunos}")
    elif opção_escolhida == 3:
        nome_procurado = input("Digite o nome do aluno que deseja buscar: ")
        
