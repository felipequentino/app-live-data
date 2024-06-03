<template>
  <v-container>
    <div class="population-display">
      <h2 class="title">Informações do Brasil atualizadas em tempo real</h2>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="section population-section">
            <v-card-title class="section-title">População</v-card-title>
            <v-card-text>
              <p>População atual: {{ Math.round(currentPopulationChange) }}</p>
              <p>Nascimentos hoje: {{ Math.round(birthsToday) }}</p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="section economic-section">
            <v-card-title class="section-title">Econômico</v-card-title>
            <v-card-text>
              <p>Pessoas empregadas: {{ Math.round(currentOccupationChange) }}</p>
              <p>Pessoas desempregadas: {{ Math.round(currentUnemployedChange) }}</p>
              <p>Valor médio do m² no Brasil: {{ Math.round(currentMetroChange) }}</p>
              <p>Valor médio do que um brasileiro ganha: {{ Math.round(currentIncomeChange) }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import liveChart from './liveChart.js';

export default {
  ...liveChart,
  name: 'PopulationDisplay',
};
</script>

<style scoped>
.population-display {
  flex: 1;
  padding: 40px;
  text-align: center;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #003366; /* Azul mais escuro */
  font-size: 2em; /* Letras maiores */
}

.section {
  margin-bottom: 20px;
  background-color: #ffffff; /* Verde escuro */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-title {
  background-color: #003366; /* Azul mais escuro */
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-size: 1.5em; /* Letras maiores */
}

.section p {
  margin: 0;
  padding: 10px;
  color: #000000; /* Letras mais escuras */
  font-size: 1.2em; /* Letras maiores */
}
</style>
