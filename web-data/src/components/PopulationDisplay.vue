<template>
  <v-container>
    <div class="displayContainer">
      <h2 class="title">Informações do Brasil atualizadas em tempo real</h2>
      <v-col class="container">
        <v-col class="cardContainer">
          <v-card class="section population-section">
            <v-card-title class="section-title">População</v-card-title>
            <v-card-text>
              <p>População atual: <span>{{ Math.round(currentPopulationChange) }}</span></p>
              <p>Nascimentos hoje: <span>{{ Math.round(birthsToday) }}</span></p>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="cardContainer">
          <v-card class="section economic-section">
            <v-card-title class="section-title">Econômico</v-card-title>
            <v-card-text>
              <p>Pessoas empregadas: <span>{{ Math.round(currentOccupationChange) }}</span></p>
              <p>Pessoas desempregadas: <span>{{ Math.round(currentUnemployedChange) }}</span></p>
              <p>Valor médio do m² no Brasil: R$ <span>{{ Math.round(currentMetroChange) }}</span></p>
              <p>Média salarial: R$ <span>{{ Math.round(currentIncomeChange) }}</span></p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-col>
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
.container {
  z-index: -10;
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
}
</style>
