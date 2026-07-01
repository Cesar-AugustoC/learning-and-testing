# nessa aula estou aprendendo sobre o loop while, que é uma estrutura de repetição que executa um bloco de código enquanto uma condição for verdadeira. A sintaxe básica do while é a seguinte:

""" contador = 0 # inicializa a variável contador com o valor 0
while contador < 5: # enquanto o valor da variável contador for menor que 5,
    print(contador) # imprime o valor da variável contador
    contador += 1 # incrementa o valor da variável contador em 1 """

# o loop while é útil quando não sabemos quantas vezes precisamos repetir um bloco de código, ou seja, quando a condição de parada não é conhecida. Por exemplo, podemos usar o loop while para ler dados do usuário até que ele digite uma palavra específica para sair do loop.

""" senha = "" # inicializa a variável senha com uma string vazia

while senha != 2503: # enquanto a senha digitada pelo usuário for diferente de 2503,
    senha = int(input("Digite a senha: ")) # solicita ao usuário que digite a senha e armazena o valor na variável senha

print("Senha correta!") # quando a senha digitada pelo usuário for igual a 2503, o loop while será interrompido e a mensagem "Senha correta!" será exibida. """

# também temos a função for, que é uma estrutura de repetição que executa um bloco de código para cada elemento de uma sequência (como uma lista, tupla ou string). A sintaxe básica do for é a seguinte:

""" for numero in range(5): # para cada número na sequência de 0 a 4 (funciona com a mesma lógica de indexação, ou seja, o primeiro elemento tem índice 0, o segundo elemento tem índice 1 e assim por diante, sendo que o último elemento da sequência não é incluído)
    print(numero) # imprime o valor do número """

# o for pode percorrer qualquer tipo de sequência, como listas, tuplas e strings. Por exemplo, podemos usar o for para percorrer uma lista de frutas e imprimir cada fruta na tela.

""" frutas = ["maçã", "banana", "laranja"] # cria uma lista de frutas
for fruta in frutas: # para cada fruta na lista de frutas,
    print(fruta) # imprime o valor da fruta """

# temos algumas aplicações do for, como por exemplo, podemos usar o for para percorrer uma lista de números e fazer uma tábuada de multiplicação, ou seja, multiplicar cada número da lista por um valor específico e imprimir o resultado na tela.

""" for multiplicador in range(1, 11): # para cada número de 1 a 10,
    for numero in range(1, 11): # para cada número de 1 a 10,
        resultado = multiplicador * numero # calcula o resultado da multiplicação
        print(f"{multiplicador} x {numero} = {resultado}") # imprime o resultado da multiplicação
    print() # imprime uma linha em branco para separar as tabuadas """

# podemos usar o for para percorrer uma lsita de nomes para localizar um nome específico.

""" pessoas = ["João", "Maria", "José", "Ana", "Pedro"] # cria uma lista de pessoas
nome_procurado = "Ana" # define o nome que queremos localizar na lista
for nome in pessoas: # para cada nome na lista de pessoas,
    print(f"Verificando {nome}...") # imprime a mensagem de que estamos procurando pelo nome
    if nome == nome_procurado: # se o nome for igual ao nome procurado,
        print(f"{nome} foi encontrado na lista!") # imprime a mensagem de que o nome foi encontrado na lista
print("Fim da busca!") # imprime a mensagem de que a busca foi finalizada """

# no codigo acima, mesmo encontrando o nome procurado, o loop for continua percorrendo a lista de pessoas até o final. Para interromper o loop for quando encontrarmos o nome procurado, podemos usar a instrução break.

""" pessoas = ["João", "Maria", "José", "Ana", "Pedro"] # cria uma lista de pessoas
nome_procurado = input("Digite o nome que deseja procurar: ") # define o nome que queremos localizar na lista
for nome in pessoas: # para cada nome na lista de pessoas,
    print(f"Verificando {nome}...") # imprime a mensagem de que estamos procurando pelo nome
    if nome.lower() == nome_procurado.lower(): # se o nome for igual ao nome procurado,
        print(f"{nome} foi encontrado na lista!") # imprime a mensagem de que o nome foi encontrado na lista
        break # interrompe o loop for quando encontrarmos o nome procurado
print("Fim da busca!") # imprime a mensagem de que a busca foi finalizada """

# podemos fazer um calcúlador de numeros impares usando o for.

""" print("números ímpares de 1 a 20 :")
for numero in range(1, 21): # para cada número de 1 a 20,
    if numero % 2 != 0: # se o número for ímpar,
        print(numero) # imprime o número ímpar """

# podemos fazer esse calculador de uma forma diferente usando o for.

""" print("números ímpares de 1 a 20 :")
for numero in range(1, 21): # para cada número de 1 a 20,
    if numero % 2 == 0: # se o número for par,
        continue # pula para a próxima iteração do loop
    print(numero) # imprime o número ímpar """


for numero in range(1, 6):
    if numero == 3:
        continue
    print(numero)