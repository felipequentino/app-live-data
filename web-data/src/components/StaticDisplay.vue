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
              <DropdownContent
                :number="'R$ ' + currentMetroChange.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })"
                title="Valor médio do m² no Brasil"
                description="Custo médio m² em moeda corrente"
              />
              <br />
              <DropdownContent
                number="R$ 3.033"
                title="Média salarial da população"
                description="Rendimento médio mensal real das pessoas de 14 anos ou mais de idade ocupadas na semana de referência com rendimento de trabalho, habitualmente e efetivamente recebidos no trabalho principal e em todos os trabalhos"
              />
              <br />
              <DropdownContent
                number="R$ 3.223"
                title="Média salarial dos Homens"
                description="Rendimento médio mensal real dos homens de 14 anos ou mais de idade ocupadas na semana de referência com rendimento de trabalho, habitualmente e efetivamente recebidos no trabalho principal e em todos os trabalhos"
              />
              <br />
              <DropdownContent
                number="R$ 2.639"
                title="Média salarial das Mulheres"
                description="Rendimento médio mensal real dos homens de 14 anos ou mais de idade ocupadas na semana de referência com rendimento de trabalho, habitualmente e efetivamente recebidos no trabalho principal e em todos os trabalhos"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section regions-section">
            <v-card-title class="section-title">Regiões</v-card-title>
            <v-card-text>
              <br />
              <DropdownContent
                :number="'R$ ' + currentCentroOesteMetroChange.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })"
                title="Valor médio do m² no Centro-Oeste"
                description="Custo médio m² em moeda corrente do Centro-Oeste"
              />
              <br />
              <DropdownContent
                :number="'R$ ' + currentNordesteMetroChange.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })"
                title="Valor médio do m² no Nordeste"
                description="Custo médio m² em moeda corrente do Nordeste"
              />
              <br />
              <DropdownContent
                :number="'R$ ' + currentSudesteMetroChange.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })"
                title="Valor médio do m² no Sudeste"
                description="Custo médio m² em moeda corrente do Sudeste"
              />
              <br />
              <DropdownContent
                :number="'R$ ' + currentNorteMetroChange.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })"
                title="Valor médio do m² no Norte"
                description="Custo médio m² em moeda corrente do Norte"
              />
              <br />
              <DropdownContent
                :number="'R$ ' + currentSulMetroChange.toLocaleString('pt-BR', { style: 'decimal', maximumFractionDigits: 2 })"
                title="Valor médio do m² no Sul"
                description="Custo médio m² em moeda corrente do Sul"
              />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import liveChart from './liveChart.js';
import DropdownContent from './DropdownComponent.vue';

export default {
  ...liveChart,
  components: {
    DropdownContent,
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
