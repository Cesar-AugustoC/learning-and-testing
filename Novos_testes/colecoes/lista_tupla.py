# Nessa parte vamos aprender sobre as coleções em Python, mais especificamente sobre listas e tuplas.
# Listas são mutáveis, ou seja, podemos alterar seus elementos. Já as tuplas são imutáveis, ou seja, não podemos alterar seus elementos depois de criadas.
# Criando uma lista

frutas = ["maçã", "banana", "laranja"]

# as listas "printam" com colchetes, usando a mesma lógica de indexação, ou seja, o primeiro elemento tem índice 0, o segundo elemento tem índice 1 e assim por diante.
""" print(frutas[1]) # isso vai imprimir "banana" """

# as listas podem armazenar elementos de tipos diferentes, ou seja, podemos ter uma lista com strings, números e até mesmo outras listas.
""" lista_mista = ["texto", 123, True, 4.5, [1, 2, 3]] """

# as listas também possuem métodos que nos permitem manipular seus elementos, como por exemplo o método append() que adiciona um elemento ao final da lista. E o método remove() que remove um elemento da lista.
""" frutas.append("uva") # isso vai adicionar "uva" ao final da lista frutas
frutas.remove("banana") # isso vai remover "banana" da lista frutas
print(frutas) # isso vai imprimir ["maçã", "laranja", "uva"] """

# ainda podemos substituir um elemento da lista, por exemplo, podemos substituir "maçã" por "abacaxi" usando o índice do elemento que queremos substituir.
""" frutas[0] = "abacaxi" # isso vai substituir "maçã" por "abacaxi" na lista frutas
print(frutas) # isso vai imprimir ["abacaxi", "laranja", "uva"] """

# ainda temos metodos de substituição, como o método insert() que nos permite inserir um elemento em uma posição específica da lista. E o método pop() que remove e retorna o elemento de uma posição específica da lista.
""" frutas.insert(1, "morango") # isso vai inserir "morango" na posição 1 da lista frutas
print(frutas) # isso vai imprimir ["abacaxi", "morango", "laranja", "uva"]
frutas.pop(2) # isso vai remover e retornar o elemento da posição 2 da lista frutas, ou seja, "laranja"
print(frutas) # isso vai imprimir ["abacaxi", "morango", "uva"] """
# o método pop() é útil quando queremos remover um elemento de uma posição específica da lista e ainda queremos usar esse elemento depois de removê-lo, por exemplo, podemos armazenar o elemento removido em uma variável para usá-lo posteriormente.
""" elemento_removido = frutas.pop(1) # isso vai remover e retornar o elemento da posição 1 da lista frutas, ou seja, "morango", e armazená-lo na variável elemento_removido
print(elemento_removido) # isso vai imprimir "morango" """

# podemos ordenar uma lista usando o método sort(), que ordena os elementos da lista em ordem crescente. E o método reverse() que inverte a ordem dos elementos da lista.
""" frutas.sort() # isso vai ordenar os elementos da lista frutas em ordem crescente
print(frutas) # isso vai imprimir em ordem crescente ["banana", "maça", "laranja"]
frutas.reverse() # isso vai inverter a ordem dos elementos da lista frutas
print(frutas) # isso vai imprimir em ordem decrescente ["laranja", "maça", "banana"] """

# podemos localizar um elemento na lista usando o método index(), que retorna o índice do primeiro elemento encontrado na lista. E o método count() que retorna o número de vezes que um elemento aparece na lista.
""" print(frutas.index("maçã")) # isso vai imprimir o índice do elemento "maçã" na lista frutas, ou seja, 0
print(frutas.count("banana")) # isso vai imprimir o número de vezes que o elemento "banana" aparece na lista frutas, ou seja, 1 """

# podemos criar uma copia da lista usando o método copy(), que retorna uma nova lista com os mesmos elementos da lista original. E o método clear() que remove todos os elementos da lista.
""" frutas_copia = frutas.copy() # isso vai criar uma nova lista frutas_copia com os mesmos elementos da lista frutas
print(frutas_copia) # isso vai imprimir ["maçã", "banana", "laranja"]
frutas.clear() # isso vai remover todos os elementos da lista frutas
print(frutas) # isso vai imprimir [] """ 
# por que usar o método clear() ao invés de criar uma nova lista vazia? Porque o método clear() mantém a referência da lista original, ou seja, se outras variáveis estiverem referenciando a mesma lista, elas também serão afetadas pela limpeza da lista. Já criar uma nova lista vazia não afetaria as outras variáveis que estão referenciando a lista original.
# e por que usar o método copy() ao invés de criar uma nova lista com os mesmos elementos? Porque o método copy() cria uma nova lista com os mesmos elementos da lista original, mas sem manter a referência da lista original, ou seja, se outras variáveis estiverem referenciando a mesma lista, elas não serão afetadas pela criação da nova lista. Já criar uma nova lista com os mesmos elementos da lista original manteria a referência da lista original, ou seja, se outras variáveis estiverem referenciando a mesma lista, elas também seriam afetadas pela criação da nova lista. (ou seja se colocar lsita1 = lista2, ambas as variáveis vão referenciar a mesma lista, ou seja, se alterar a lista usando uma das variáveis, a outra variável também será afetada pela alteração da lista. Já usando o método copy(), cada variável vai referenciar uma lista diferente, ou seja, se alterar a lista usando uma das variáveis, a outra variável não será afetada pela alteração da lista.)

# O que é uma tupla? Uma tupla é uma coleção de elementos ordenada e imutável, ou seja, não podemos alterar seus elementos depois de criadas. As tuplas são criadas usando parênteses () e os elementos são separados por vírgulas.
tupla = ("maçã", "banana", "laranja")
# as tuplas "printam" com parênteses, usando a mesma lógica de indexação, ou seja, o primeiro elemento tem índice 0, o segundo elemento tem índice 1 e assim por diante.
""" print(tupla[1]) # isso vai imprimir "banana" """
# as tuplas também podem armazenar elementos de tipos diferentes, ou seja, podemos ter uma tupla com strings, números e até mesmo outras tuplas.
""" tupla_mista = ("texto", 123, True, 4.5, (1, 2, 3)) """
# as tuplas não possuem métodos que nos permitem manipular seus elementos, pois são imutáveis, ou seja, não podemos alterar seus elementos depois de criadas. Por exemplo, não podemos usar o método append() para adicionar um elemento ao final da tupla, ou o método remove() para remover um elemento da tupla.
# ainda assim podemos acessar os elementos da tupla usando o índice, por exemplo, podemos acessar o elemento "maçã" usando o índice 0, ou o elemento "banana" usando o índice 1.
""" print(tupla[0]) # isso vai imprimir "maçã" """