<template>
    <v-container>
      <div class="displayContainer">
        <h2 class="title">Informações do Brasil que são atualizadas com pouca frequência</h2>
        <v-row class="container">
          <v-col class="cardContainer" cols="12" md="4">
            <v-card class="section economic-section">
              <v-card-title class="section-title">Econômico</v-card-title>
              <v-card-text>
                <br />
                <TooltipComponent displayText="Valor médio do m² no Brasil: " tooltipText="Custo médio m² em moeda corrente" />
                <span>R$ {{ currentMetroChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2}) }}</span>
                <br>
                <br>
                <TooltipComponent displayText="Média salarial da população: " tooltipText="Rendimento médio mensal real das pessoas de 14 anos ou mais de idade ocupadas na semana de referência com rendimento de trabalho, habitualmente e efetivamente recebidos no trabalho principal e em todos os trabalhos" />
                <span>R$ 3.033</span>
                <br />
                <br />
                <TooltipComponent displayText="Média salarial dos Homens: " tooltipText="Rendimento médio mensal real dos homens de 14 anos ou mais de idade ocupadas na semana de referência com rendimento de trabalho, habitualmente e efetivamente recebidos no trabalho principal e em todos os trabalhos" />
                <span>R$ 3.223</span>
                <br />
                <br />
                <TooltipComponent displayText="Média salarial das Mulheres: " tooltipText="Rendimento médio mensal real dos homens de 14 anos ou mais de idade ocupadas na semana de referência com rendimento de trabalho, habitualmente e efetivamente recebidos no trabalho principal e em todos os trabalhos" />
                <span>R$ 2.639</span>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="cardContainer" cols="12" md="4">
            <v-card class="section regions-section">
              <v-card-title class="section-title">Regiões</v-card-title>
              <v-card-text>
                <br />
                <TooltipComponent displayText="Valor médio do m² no Centro-Oeste: " tooltipText="Custo médio m² em moeda corrente do Centro-Oeste" />
                <span>R$ {{ currentCentroOesteMetroChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2})}}</span>
                <br />
                <br />
                <TooltipComponent displayText="Valor médio do m² no Nordeste: " tooltipText="Custo médio m² em moeda corrente do Nordeste" />
                <span>R$ {{ currentNordesteMetroChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2})}}</span>
                <br />
                <br />
                <TooltipComponent displayText="Valor médio do m² no Sudeste: " tooltipText="Custo médio m² em moeda corrente do Sudeste" />
                <span>R$ {{ currentSudesteMetroChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2}) }}</span>
                <br />
                <br />
                <TooltipComponent displayText="Valor médio do m² no Norte: " tooltipText="Custo médio m² em moeda corrente do Norte" />
                <span>R$ {{ currentNorteMetroChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2}) }}</span>
                <br />
                <br />
                <TooltipComponent displayText="Valor médio do m² no Sul: " tooltipText="Custo médio m² em moeda corrente do Sul" />
                <span>R$ {{ currentSulMetroChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2}) }}</span>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </template>
  
  <script>
  import liveChart from './liveChart.js';
  import TooltipComponent from './TooltipComponent.vue';
  
  export default {
    ...liveChart,
    components: {
      TooltipComponent,
    },
    name: 'StaticDisplay',
  
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 2rem;
    display: grid;
    place-items: center;
  }
  
  .cardContainer {
    max-width: 60rem;
  }
  
  .displayContainer {
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 2rem;
  }
  
  .title {
    text-align: center;
    color: #003366;
    font-size: 2.5em;
    font-weight: bold;
    margin-top: 2rem;
  }
  
  .section {
    margin-bottom: 1rem;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .section-title {
    background-color: #003366;
    color: white;
    padding: 0.5rem;
    border-radius: 8px 8px 0 0;
    font-size: 1.5em;
  }
  
  .section p {
    margin: 1rem;
    color: #000000;
    font-size: 1.5em;
    font-weight: 600;
  }
  
  span {
    color: rgb(17, 148, 63);
    font-size: 1.5em;
    font-weight: 600;
    margin: 0.5rem;
  }
  </style>
  