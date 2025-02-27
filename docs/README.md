# Análise de Degradação de Estradas com Machine Learning

## Descrição
Este projeto utiliza algoritmos de machine learning para identificar e avaliar a degradação de estradas a partir de imagens de satélite. O foco principal é a região Norte do Brasil, especialmente a Amazônia, onde as condições das rodovias são mais críticas. A avaliação considera aspectos como pavimentação e permite a visualização das imagens processadas.

## Objetivo
O objetivo deste projeto é fornecer uma ferramenta eficiente para análise da infraestrutura rodoviária, auxiliando órgãos públicos e pesquisadores no monitoramento da degradação das estradas. Com a automação da análise por meio de machine learning, é possível obter avaliações mais rápidas e consistentes, contribuindo para o planejamento de melhorias e manutenções.

## Tecnologias Utilizadas
O projeto é desenvolvido utilizando as seguintes tecnologias:

### Backend:
- **Python**: Linguagem principal para processamento de dados e machine learning.
- **TensorFlow / PyTorch**: Frameworks para criação e treinamento dos modelos de machine learning.
- **OpenCV**: Processamento de imagens para aprimorar a análise.
- **Pandas e NumPy**: Manipulação e análise de dados.
- **Flask / FastAPI**: API para comunicação entre o backend e o frontend.
- **Google Earth Engine / Sentinel Hub**: Fonte de imagens de satélite.

### Frontend:
- **React**: Framework para construção da interface web interativa.
- **Tailwind CSS**: Estilização moderna e responsiva.
- **Recharts**: Visualização de dados e gráficos.

### Banco de Dados:
- **PostgreSQL / Firebase**: Armazenamento de informações processadas e resultados.

## Funcionalidades
- **Coleta e processamento de imagens de satélite**: Utilização de APIs para obtenção das imagens mais recentes.
- **Treinamento e aplicação de modelos de machine learning**: Classificação da degradação das rodovias com base nas imagens.
- **Reajuste da avaliação**: Atualização da análise conforme novas imagens são disponibilizadas.
- **Visualização dos resultados**: Exibição das imagens processadas e das avaliações de degradação na interface web.
- **Exportação de dados**: Possibilidade de download dos resultados para análise externa.

## Estrutura do Projeto
```
📦 meu-projeto
├── 📂 backend/               # Código da API e processamento de dados
│   ├── 📂 models/           # Modelos de machine learning
│   ├── 📂 data/             # Dados de entrada e saída
│   ├── 📂 api/              # Código do backend (API)
├── 📂 frontend/             # Código da interface web
│   ├── 📂 src/              # Código-fonte React/Vue
│   ├── 📂 public/           # Arquivos estáticos (CSS, imagens)
├── 📂 docs/                 # Documentação do projeto
├── 📂 tests/                # Testes automatizados
├── .gitignore               # Arquivos a serem ignorados no Git
├── README.md                # Descrição principal do projeto
├── LICENSE                  # Licença do projeto
```

## Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Instale as dependências do backend:
   ```bash
   pip install -r backend/requirements.txt
   ```
3. Instale as dependências do frontend:
   ```bash
   cd frontend
   npm install
   ```
4. Execute o modelo de análise:
   ```bash
   python backend/main.py
   ```
5. (Opcional) Inicie o servidor para visualizar os resultados:
   ```bash
   python backend/app.py
   ```
6. Inicie o frontend:
   ```bash
   cd frontend
   npm start
   ```

## Contato
Caso tenha dúvidas ou sugestões, entre em contato:
- **Email**: joao870melo@gmail.com
- **LinkedIn**: [Joao Melo](https://linkedin.com/in/seu-perfil)
- **GitHub**: [Joao87Melo0](https://github.com/Joao87Melo0/)
