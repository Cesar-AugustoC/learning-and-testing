# Manipulando Strings em Python

# aqui eu estava testando como acessar caracteres específicos de uma string usando índices e como fatiar uma string para obter substrings. O código abaixo mostra esses conceitos:

""" fruta = 'melancia'
print(fruta[0]) # esse colchetes serve para "fatiar" uma string, ou seja, pegar um pedaço dela. O número dentro dos colchetes indica a posição do caractere que queremos acessar. Lembre-se que a contagem começa do zero, então 'm' está na posição 0, 'e' na posição 1, e assim por diante.

print(fruta[1]) # isso vai imprimir 'e', que é o segundo caractere

print(fruta[-1]) # isso vai imprimir 'a', que é o último caractere da string. O índice negativo conta de trás para frente, então -1 é o último caractere, -2 é o penúltimo, e assim por diante.

print(fruta[0:5]) # isso vai imprimir 'melan', que é a substring que começa na posição 0 e termina na posição 4 (o caractere na posição 5 não é incluído). O formato é [início:fim], onde o início é inclusivo e o fim é exclusivo (ou podemos dizer que ele desconsidera o valor 1).

print(fruta[:5]) # isso é equivalente a fruta[0:5], ou seja, vai imprimir 'melan'. Quando omitimos o início, ele assume que é 0.

print(fruta[5:]) # isso é equivalente a fruta[5:len(fruta)], ou seja, vai imprimir 'cia'. Quando omitimos o fim, ele assume que é o comprimento da string.

print(fruta[3:5]) # isso vai imprimir 'an', que é a substring que começa na posição 3 e termina na posição 4. O formato é [início:fim], onde o início é inclusivo e o fim é exclusivo.

print(fruta[3:8]) # isso vai imprimir 'ancia', que é a substring que começa na posição 3 e termina na posição 7. """

# aqui eu estava apenas testando a função len() para contar o número de caracteres em uma string. O código abaixo mostra como usar essa função:

""" frase = 'Python é uma linguagem de programação incrível!'
# print(len(frase)) isso vai imprimir o comprimento da string, ou seja, o número de caracteres que ela contém, incluindo espaços e pontuação. No caso dessa frase, o resultado será 47.

frase_tamanho = len(frase) # aqui estamos armazenando o comprimento da string na variável 'frase_tamanho'

print(f"A frase {frase} tem {frase_tamanho} caracteres.") 
# Lembrando os conceitos iniciais onde o 'f' no começo serve para colocar variáveis dentro da string. E o operador que faz isso são as chaves {}. Isso vai imprimir a frase completa e o número de caracteres que ela contém, usando uma f-string para formatar a saída. O resultado será: "A frase Python é uma linguagem de programação incrível! tem 47 caracteres." """

# aqui eu quis fazer um programa que pede para o usuário digitar uma frase e depois conta quantos caracteres essa frase tem, incluindo espaços e pontuação. O código abaixo realiza essa tarefa:

""" frase = input("Digite uma frase: ") # aqui estamos pedindo para o usuário digitar uma frase e armazenando essa frase na variável 'frase'

frase_tamanho = len(frase) # aqui estamos calculando o comprimento da frase digitada pelo usuário e armazenando esse valor na variável 'frase_tamanho'

print(f"A frase '{frase}' tem {frase_tamanho} caracteres.")
# aqui estamos imprimindo a frase digitada pelo usuário e o número de caracteres que ela contém, usando uma f-string para formatar a saída. O resultado será algo como: "A frase 'Olá, mundo!' tem 13 caracteres." (dependendo da frase que o usuário digitar). """

# aqui eu estava testando o método count() para contar quantas vezes um determinado caractere ou substring aparece em uma string. O código abaixo mostra como usar esse método:

""" frase = "Python é uma linguagem de programação incrível!"
contagem = frase.count('a') # aqui estamos usando o método count() para contar quantas vezes a letra 'a' aparece na frase. O resultado será 5, pois a letra 'a' aparece 5 vezes na frase.
print(f"A letra 'a' aparece {contagem} vezes na frase '{frase}'.") """

# aqui eu estava testando o método find() para localizar a posição da primeira ocorrência de um caractere ou substring em uma string. O código abaixo mostra como usar esse método:

""" frase = "Python é uma linguagem de programação incrível!"
localizar_index = frase.find('m') # aqui estamos usando o método find() para localizar a posição da primeira ocorrência da letra 'm' na frase. O resultado será 22, pois a letra 'm' aparece pela primeira vez na posição 22 da string (contando a partir do zero).
print(f"A letra 'm' aparece pela primeira vez na posição {localizar_index} da frase '{frase}'.") """

# tentei fazer um estudo sobre como fazer um programa que pede para o usuário digitar uma frase e um caractere, e depois localiza a posição da primeira ocorrência desse caractere na frase. O código abaixo realiza essa tarefa:
""" 
frase = input("Digite uma frase: ") # aqui estamos pedindo para o usuário digitar uma frase e armazenando essa frase na variável 'frase'
localizar_index = frase.find(input("Digite um caractere para localizar: ")) # aqui estamos pedindo para o usuário digitar um caractere que ele quer localizar na frase, e usando o método find() para encontrar a posição da primeira ocorrência desse caractere na frase. O resultado será a posição do caractere ou -1 se ele não for encontrado.
if localizar_index == -1: # aqui estamos verificando se o valor de localizar_index é igual a -1, o que indica que o caractere digitado pelo usuário não foi encontrado na frase.
    print(f"O caractere que digitou, não está no texto.") # aqui estamos imprimindo uma mensagem informando que o caractere digitado pelo usuário não foi encontrado na frase.
else:
    print(f"O caractere que você digitou aparece pela primeira vez na posição {localizar_index} da frase '{frase}'.") # aqui estamos imprimindo a posição do caractere digitado pelo usuário na frase, usando uma f-string para formatar a saída. O resultado será algo como: "O caractere que você digitou aparece pela primeira vez na posição 5 da frase 'Olá, mundo!'." (dependendo da frase e do caractere que o usuário digitar). """

# fazendo um estudo sobre o operador 'in' para verificar se uma substring está presente em uma string. O código abaixo mostra como usar esse operador:
""" 
frase = "Python é uma linguagem de programação incrível!"
if 'Python' in frase: # aqui estamos usando o operador 'in' para verificar se a substring 'Python' está presente na string 'frase'. O resultado será True, pois a palavra 'Python' está de fato presente na frase.
    print("A palavra 'Python' está presente na frase.") # aqui estamos imprimindo uma mensagem informando que a palavra 'Python' está presente na frase.
else:
    print("A palavra 'Python' não está presente na frase.") # aqui estamos imprimindo uma mensagem informando que a palavra 'Python' não está presente na frase. """

# algumas funções simples para manipular strings, como upper() para converter uma string para maiúsculas, lower() para converter para minúsculas, e strip() para remover espaços em branco no início e no final de uma string, capitalize() para colocar a primeira letra em maiúscula e o restante em minúscula, e title() para colocar a primeira letra de cada palavra em maiúscula. O código abaixo mostra como usar essas funções:

""" frase = "   Python é uma linguagem de programação incrível!   "
print(f"Frase original: '{frase}'")
print(f"Frase em maiúsculas: '{frase.upper()}'")
print(f"Frase em minúsculas: '{frase.lower()}'")
print(f"Frase sem espaços no início e no final: '{frase.strip()}'")
print(f"Frase com a primeira letra em maiúscula: '{frase.capitalize()}'")
print(f"Frase com a primeira letra de cada palavra em maiúscula: '{frase.title()}'") """

# aqui eu estava testando o método replace() para substituir uma substring por outra em uma string. O código abaixo mostra como usar esse método:

""" frase = "Python é uma linguagem de programação incrível!"
frase_substituida = frase.replace('incrível', 'fantástica') # aqui estamos usando o método replace() para substituir a palavra 'incrível' por 'fantástica' na string 'frase'. O resultado será a nova string com a substituição realizada.
print(f"Frase original: '{frase}'")
print(f"Frase substituída: '{frase_substituida}'") """