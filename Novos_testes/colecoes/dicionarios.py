# nessa aula vamos aprender sobre dicionários, que são coleções de dados que armazenam pares de chave e valor. Eles são muito úteis quando precisamos associar informações de forma rápida e eficiente.

pessoas = {
    "nome": "João",
    "idade": 30,
    "cidade": "Paranaguá",
    "profissão": ["Engenheiro", "Professor", "Pescador"]
}

""" print(pessoas)  # Imprime o dicionário completo
print(pessoas["nome"])  # Acessa o valor associado à chave "nome" """

# os dicionarios são mutáveis, ou seja, podemos adicionar, remover ou modificar elementos após a sua criação. (seguindo as mesmas logicas de listas, mas com a diferença de que os dicionários utilizam chaves para acessar os valores, enquanto as listas utilizam índices numéricos.)

""" pessoas["idade"] = 31  # Modifica o valor associado à chave "idade"
pessoas["profissão"] = "Engenheiro"  # Adiciona uma nova chave-valor ao dicionário
print(pessoas)  # Imprime o dicionário atualizado """

# podemos utilizar a função del() para remover um elemento do dicionário, especificando a chave que desejamos excluir.
""" del pessoas["cidade"]  # Remove a chave "cidade" e seu valor associado """

# podemos colocar listas como valores dentro de dicionários, o que nos permite armazenar múltiplos valores associados a uma única chave.
""" print(pessoas["profissão"])  # Imprime a lista de profissões associada à chave "profissão"
print(pessoas["profissão"][1])  # Acessa o segundo elemento da lista de profissões """

# a função keys() retorna uma lista com todas as chaves do dicionário, enquanto a função values() retorna uma lista com todos os valores.
# se tentarmos puxar o index de um valor ele vai dar erro, pois os dicionários não possuem índices numéricos como as listas. Mas podemos contornar isso criando uma outra variável que armazene os valores do dicionário em uma lista, e então acessar o índice dessa lista.
""" valores = list(pessoas.values())  # Converte os valores do dicionário em uma lista
print(valores[1])  # Acessa o segundo valor da lista de valores do dicionário """
# podendo substituir o "pessoas.values()" por "pessoas.keys()" para acessar as chaves do dicionário.

# ainda temos também a função items(), que retorna uma lista de tuplas, onde cada tupla contém um par chave-valor do dicionário. Isso é útil quando queremos iterar sobre os elementos do dicionário e acessar tanto as chaves quanto os valores ao mesmo tempo.

# para buscarmos um valor dentro de um dicionário, podemos utilizar a função get(), que nos permite acessar o valor associado a uma chave específica. Se a chave não existir, a função retorna None, evitando erros no código.
""" print(pessoas.get("nome"))  # Acessa o valor associado à chave "nome" """


