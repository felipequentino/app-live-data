# Brasilico

Seja bem vindo ao repositório do projeto Brasilico!
O projeto é fruto de um PIBITI, feito pelo aluno João F. Quentino e pelo orientador Hendrik T. Macedo, ambos da Universidade Federal de Sergipe.

O Brasilico é um portal de informações do Brasil em tempo real, onde as exibe com base em previsões feitas a partir de modelos de Séries Temporais. Para saber com mais detalhes como foi feito o processo de previsão dos dados, confira o notebook abaixo:

[Séries Temporais](https://felipequentino.quarto.pub/series-temporais/)

## Dados Apresentados

- População Atual
- Nascimentos Este Ano
- Nascimentos Hoje
- Mortes Este Ano
- Mortes Hoje
- Pessoas Empregadas
- Pessoas Desempregadas
- Custo do m² no Brasil
- Custo do m² nas 5 Regiões do Brasil (Norte, Nordeste, Centro-Oeste, Sudeste, Sul)
- Rendimento da População (habitual)
- Rendimento médio real de todos os trabalhos
- Veículos Licenciados
- Veículos Exportados
- Veículos Produzidos
- Celulares vendidos

## Modelos Utilizados

Para a previsão dos dados apresentados, foram utilizados diversos modelos de séries temporais, incluindo ARIMA, SARIMAX e Forecast Drift. A escolha do modelo para cada série de dados foi feita com base nas características específicas de cada série e no desempenho do modelo em testes de previsão.

## Fontes dos Dados (das informações atuais)

- [SIDRA - IBGE](https://sidra.ibge.gov.br/home/pnadcm)
- [SIDRA TABELAS - IBGE](https://sidra.ibge.gov.br/pesquisa/pnadca/tabelas)
- [Sistema de Estatísticas Vitais](https://www.ibge.gov.br/estatisticas/sociais/populacao/9110-estatisticas-do-registro-civil.html?edicao=32267&t=o-que-e)
- [PNAD Contínua - Pesquisa Nacional por Amostra de Domicílios Contínua](https://www.ibge.gov.br/estatisticas/sociais/trabalho/9173-pesquisa-nacional-por-amostra-de-domicilios-continua-trimestral.html?=&t=resultados)
- [ANFAVEA](https://anfavea.com.br/site/edicoes-em-excel/)
- [Abinee](https://www.abinee.org.br/organizacao/decon/dados/setoriais/)

## Deploy

O projeto está disponível em: [Brasilico](https://brasilico.vercel.app/)