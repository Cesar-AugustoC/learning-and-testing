# nessa aula estou estudando as funções.

""" def saudação():
    print("Olá! Bem-vindo(a).") """
# acima temos uma função simples que imprime uma saudação na tela.

#a função abaixo recebe um parâmetro e imprime uma saudação personalizada.

""" def saudação(nome):
    print(f"Olá, {nome}! Bem-vindo(a).") """
""" saudação() """ # essa linha de código chama a função saudação(), mas ela vai dar erro devido a falta do argumento nome.

""" def saudação(nome):
    print(f"Olá, {nome}! Bem-vindo(a).")
saudação("João") """ # essa linha de código chama a função saudação() e passa o argumento "João" para o parâmetro nome.

""" def somar(a, b):
    resultado = a + b
    print(f"O resultado da soma de {a} e {b} é: {resultado}")
somar(3, 5) """ # essa linha de código chama a função somar() e passa os argumentos 3 e 5 para os parâmetros a e b.

# podemos fazer a função retornar um valor ao invés de apenas imprimir o resultado na tela.
""" def somar(a, b):
    resultado = a + b
    return resultado
resultado_soma = somar(3, 5) # essa linha de código chama a função somar() e passa os argumentos 3 e 5 para os parâmetros a e b.
print(f"O resultado da soma de 3 e 5 é: {resultado_soma}") """ # o return da função somar() é armazenado na variável resultado_soma e depois impresso na tela.

""" def calcular_descontos (preço, percentual_desconto):
    desconto = preço * (percentual_desconto / 100)
    preço_com_desconto = preço - desconto
    return preço_com_desconto """

""" preço_final = calcular_descontos(100, 10) """ # essa linha de código chama a função calcular_descontos() e passa os argumentos 100 e 10 para os parâmetros preço e percentual_desconto.
""" print(f"O preço final com desconto é: {preço_final}") """ # o return da função calcular_descontos() é armazenado na variável preço_final e depois impresso na tela.

# também posso pedir inputs para o usuário informar os valores de preço e percentual de desconto dentro das funções, mas nesse caso não posso passar argumentos para a função.
def calcular_descontos (preço, percentual_desconto):
    desconto = preço * (percentual_desconto / 100)
    preço_com_desconto = preço - desconto
    return preço_com_desconto
preço_final = calcular_descontos(float(input("Digite o preço: ")), float(input("Digite o percentual de desconto: "))) # essa linha de código chama a função calcular_descontos() e passa os argumentos preço e percentual_desconto para os parâmetros preço e percentual_desconto.
print(f"O preço final com desconto é: {preço_final}") # o return da função calcular_descontos() é armazenado na variável preço_final e depois impresso na tela.