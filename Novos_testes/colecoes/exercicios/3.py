nomes = [ "Ana", "Bruno", "Carla", "Daniel", "Eduarda", "Fernando", "Giovana", "Hugo", "Isabela", "João", "Carla", "Lucas", "Mariana", "Nuno", "Olivia", "João", "Pedro", "Carla", "Rafael", "Ana" ]

nome_procurado = input("Digite o nome que deseja procurar na lista: ")

print(f'O nome {nome_procurado.lower()} aparece {sum(1 for n in nomes if n.lower() == nome_procurado.lower())} vezes na lista.')

#explicando a função sum(1 for n in nomes if n.lower() == nome_procurado.lower()):
# A função sum() é usada para somar os valores de um iterável. Nesse caso, estamos usando uma expressão geradora (generator expression) para contar quantas vezes o nome procurado aparece na lista de nomes. A expressão geradora percorre cada elemento da lista nomes e verifica se ele é igual ao nome procurado (ignorando maiúsculas e minúsculas). Para cada ocorrência, a expressão retorna 1, e a função sum() soma todos esses valores, resultando no total de ocorrências do nome na lista.