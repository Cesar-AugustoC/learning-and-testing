valor_da_compra = float(input('Digite o valor da compra: '))
tem_programa_de_fidelidade = input('Você tem um programa de fidelidade? (sim/não): ').lower()

if tem_programa_de_fidelidade == 'sim' and valor_da_compra >= 100:
    print('Frete gratis! Você se qualificou para frete grátis.')
else:
    print('Frete normal. O valor da compra não se qualifica para frete grátis ou você não tem um programa de fidelidade.')