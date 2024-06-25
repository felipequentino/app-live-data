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
              <span>{{ Math.round(Math.round(currentPopulationMenChange) + Math.round(currentPopulationWomenChange)).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="População de Homens: " tooltipText=" População de Homens - Total" />
              <span>{{ Math.round(currentPopulationMenChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="População de Mulheres: " tooltipText=" População de Mulheres- Total" />
              <span>{{ Math.round(currentPopulationWomenChange).toLocaleString('pt-BR') }}</span>
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
              <span>{{  Math.round(Math.round(currentOccupationMenChange) + Math.round(currentOccupationWomenChange)).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Homens empregados: " tooltipText="Homens de 14 anos ou mais de idade, ocupados na semana de referência"></TooltipComponent>
              <span>{{ Math.round(currentOccupationMenChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Mulheres empregadas: " tooltipText="Mulheres de 14 anos ou mais de idade, ocupadas na semana de referência"></TooltipComponent>
              <span>{{ Math.round(currentOccupationWomenChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Pessoas desempregadas: " tooltipText="Pessoas de 14 anos ou mais de idade, desocupadas nas semana de referência" />
              <span>{{  Math.round(Math.round(currentUnemployedMenChange) + Math.round(currentUnemployedWomenChange)).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Homens desempregados: " tooltipText="Homens de 14 anos ou mais de idade, desocupadas nas semana de referência" />
              <span>{{ Math.round(currentUnemployedMenChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Mulheres desempregadas: " tooltipText="Mulheres de 14 anos ou mais de idade, desocupadas nas semana de referência" />
              <span>{{ Math.round(currentUnemployedWomenChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Gastos com a saúde: " tooltipText="Total de despesas executadas para a área de atuação Saúde - Esse Ano (2024)" />
              <span>R$ {{ currentHealthExpensesChange.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits:2,maximumFractionDigits: 2}) }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Gastos com a educação: " tooltipText="Total de despesas executadas para a área de atuação Educação -  - Esse Ano (2024)" />
              <span>R$ {{ currentEducationExpensesChange.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits:2,maximumFractionDigits: 2}) }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Rendimento mensal de todos os brasileiros: " tooltipText="Massa de rendimento real de todos os trabalhos, habitualmente recebido por mês, pelas pessoas de 14 anos ou mais de idade, ocupadas na semana de referência, com rendimento de trabalho - Esse Ano (2024)" />
              <span>R$ {{ currentIncomeMassaChange.toLocaleString('pt-BR', {style: 'decimal', minimumFractionDigits:2, maximumFractionDigits: 2}) }}</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section vehicle-section">
            <v-card-title class="section-title">Veículos</v-card-title>
            <v-card-text>
              <br />
              <TooltipComponent displayText="Veículos Licenciados: " tooltipText="Veículos Licenciados - Esse Ano (2024)" />
              <span>{{ Math.round(Math.round(currentLicenciadosNacionaisChange) + Math.round(currentImportacaoVeiculosChange)).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Veículos Nacionais Licenciados: " tooltipText="Veículos Nacionais Licenciados - Esse Ano (2024)" />
              <span>{{ Math.round(currentLicenciadosNacionaisChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Veículos Importados Licenciados: " tooltipText="Veículos Importados Licenciados - Esse Ano (2024)" />
              <span>{{ Math.round(currentImportacaoVeiculosChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Veículos Brasileiros Exportados: " tooltipText="Veículos Brasileiros Exportados - Esse Ano (2024)" />
              <span>{{ Math.round(currentExportacaoVeiculosChange).toLocaleString('pt-BR') }}</span>
              <br />
              <br />
              <TooltipComponent displayText="Veículos Brasileiros Produzidos: " tooltipText="Veículos Brasileiros Produzidos - Esse Ano (2024)" />
              <span>{{ Math.round(currentProducaoVeiculosChange).toLocaleString('pt-BR') }}</span>
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
