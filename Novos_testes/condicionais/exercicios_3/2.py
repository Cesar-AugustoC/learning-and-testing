meio_de_transporte = input('Digite o meio de transporte que você utiliza (carro, bicicleta, avião, helicóptero): ').lower()

match meio_de_transporte:
    case 'carro':
        print('transporte terrestre')
    case 'bicicleta':
        print('transporte sustentável')
    case 'avião' | 'helicóptero':
        print('transporte aéreo')
    case _:
        print('Meio de transporte desconhecido')