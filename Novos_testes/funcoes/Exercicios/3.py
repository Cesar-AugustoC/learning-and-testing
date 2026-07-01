def verificar_par(numero):
    resultado = numero % 2
    if resultado == 0:
        print('o numero é par'),
    else:
        print('o numero é impar'),
verificar_par(int(input("digite um numero: ")))