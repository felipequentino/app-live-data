<template>
  <v-container>
    <div class="displayContainer">
      <h2 class="title">Informações do Brasil atualizadas em tempo real</h2>
      <v-row class="container">
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section population-section">
            <v-card-title class="section-title">População</v-card-title>
            <v-card-text>
              <br />
              <TooltipComponent displayText="População atual: " tooltipText=" População - Total" />
              <span>{{ Math.round(currentPopulationChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Nascimentos esse ano: " tooltipText="Nascidos vivos - Total no ano de 2024" />
              <span>{{ Math.round(birthsThisYear).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Nascimentos hoje: " tooltipText="Nascidos vivos - Hoje" />
              <span>{{ Math.round(birthsToday).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Mortes esse ano: " tooltipText="Óbitos - Total no ano de 2024" />
              <span>{{ Math.round(deathsThisYear).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Mortes hoje: " tooltipText="Óbitos - Hoje" />
              <span>{{ Math.round(deathsToday).toLocaleString('pt-BR') }}</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section economic-section">
            <v-card-title class="section-title">Econômico</v-card-title>
            <v-card-text>
              <br />
              <TooltipComponent displayText="Pessoas empregadas: " tooltipText="Pessoas de 14 anos ou mais de idade, ocupadas na semana de referência"></TooltipComponent>
              <span>{{ Math.round(currentOccupationChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Pessoas desempregadas: " tooltipText="Pessoas de 14 anos ou mais de idade, desocupadas nas semana de referência" />
              <span>{{ Math.round(currentUnemployedChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Valor médio do m² no Brasil: " tooltipText="Custo médio m² em moeda corrente" />
              <span>R$ {{ currentMetroChange.toFixed(2).toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2}) }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Média salarial: " tooltipText="Rendimento médio real do trabalho principal, habitualmente recebido por mês, pelas pessoas de 14 anos ou mais de idade, ocupadas na semana de referência, com rendimento de trabalho" />
              <span>R$ {{ currentIncomeChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2}) }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Rendimento mensal de todos os brasileiros: " tooltipText="Massa de rendimento real de todos os trabalhos, habitualmente recebido por mês, pelas pessoas de 14 anos ou mais de idade, ocupadas na semana de referência, com rendimento de trabalho" />
              <span>R$ {{ currentIncomeMassaChange.toLocaleString('pt-BR', {style: 'decimal', maximumFractionDigits: 2}) }}</span>
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
  name: 'PopulationDisplay',

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
