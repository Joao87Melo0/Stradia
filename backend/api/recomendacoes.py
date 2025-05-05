import random
from collections import Counter

def recomendar_estradas(historico_estradas, estradas_disponiveis, total_recomendacoes):
    ultimos_acessos = historico_estradas[-10:]
    regioes = [estrada["regiao"] for estrada in ultimos_acessos]
    contagem_regioes = Counter(regioes)
    total = sum(contagem_regioes.values())
    porcentagem_regioes = {regiao: contagem / total for regiao, contagem in contagem_regioes.items()}
    
    nomes_ja_vistos = {estrada["nome"] for estrada in historico_estradas}
    recomendacoes = []

    for regiao, proporcao in porcentagem_regioes.items():
        qtd = round(proporcao * total_recomendacoes)
        candidatas = [
            estrada for estrada in estradas_disponiveis
            if estrada["regiao"] == regiao and estrada["nome"] not in nomes_ja_vistos
        ]
        random.shuffle(candidatas)
        recomendacoes.extend(candidatas[:qtd])

    random.shuffle(recomendacoes)
    return recomendacoes[:total_recomendacoes]

# Exemplo de uso:
historico_estradas = [
    {"nome": "AM-010", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-070", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-240", "regiao": "Centro-Sul"},
    {"nome": "AM-363", "regiao": "Centro-Sul"},
    {"nome": "AM-070", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-070", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-354", "regiao": "Centro-Sul"},
    {"nome": "AM-254", "regiao": "Centro-Sul"},
    {"nome": "AM-352", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-250", "regiao": "Centro-Sul"}
]

estradas_disponiveis = [
    {"nome": "AM-010", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-070", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-352", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-240", "regiao": "Centro-Sul"},
    {"nome": "AM-363", "regiao": "Centro-Sul"},
    {"nome": "AM-354", "regiao": "Centro-Sul"},
    {"nome": "AM-254", "regiao": "Centro-Sul"},
    {"nome": "AM-250", "regiao": "Centro-Sul"},
    {"nome": "AM-174", "regiao": "Norte"},
    {"nome": "AM-464", "regiao": "Sul"},
    {"nome": "AM-215", "regiao": "Centro-Sul"},
    {"nome": "AM-110", "regiao": "Metropolitana de Manaus"},
    {"nome": "AM-320", "regiao": "Centro-Sul"}
]

recomendadas = recomendar_estradas(historico_estradas, estradas_disponiveis, total_recomendacoes=6)

print("Recomendações:")
for estrada in recomendadas:
    print(f"- {estrada['nome']} ({estrada['regiao']})")
