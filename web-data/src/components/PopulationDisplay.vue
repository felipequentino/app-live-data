<template>
  <v-container class="mainContainer">
    <div class="displayContainer">
      <h2 class="title">Informações do Brasil atualizadas em tempo real</h2>
      <v-row class="container">
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section">
            <v-card-title class="section-title">População</v-card-title>
            <v-card-text>
              <br />
              <DropdownContent
                :number="Math.round(currentPopulationMenChange + currentPopulationWomenChange).toLocaleString('pt-BR')"
                title="População Total"
                description="População - Total"
              />
              <br />
              <DropdownContent
                :number="Math.round(currentPopulationMenChange).toLocaleString('pt-BR')"
                title="População de Homens"
                description="População de Homens - Total"
              />
              <br />
              <DropdownContent
                :number="Math.round(currentPopulationWomenChange).toLocaleString('pt-BR')"
                title="População de Mulheres"
                description="População de Mulheres - Total"
              />
              <br />
              <DropdownContent
                :number="Math.round(birthsThisYear).toLocaleString('pt-BR')"
                title="Nascimentos esse ano"
                description="Nascidos vivos - Total no ano de 2024"
              />
              <br />
              <DropdownContent
                :number="Math.round(birthsToday).toLocaleString('pt-BR')"
                title="Nascimentos hoje"
                description="Nascidos vivos - Hoje"
              />
              <br />
              <DropdownContent
                :number="Math.round(deathsThisYear).toLocaleString('pt-BR')"
                title="Mortes esse ano"
                description="Óbitos - Total no ano de 2024"
              />
              <br />
              <DropdownContent
                :number="Math.round(deathsToday).toLocaleString('pt-BR')"
                title="Mortes hoje"
                description="Óbitos - Hoje"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section">
            <v-card-title class="section-title">Empregos</v-card-title>
            <v-card-text>
              <br />
              <DropdownContent
                :number="Math.round(currentOccupationMenChange + currentOccupationWomenChange).toLocaleString('pt-BR')"
                title="Pessoas empregadas"
                description="Pessoas de 14 anos ou mais de idade, ocupadas na semana de referência"
              />
              <br />
              <DropdownContent
                :number="Math.round(currentOccupationMenChange).toLocaleString('pt-BR')"
                title="Homens empregados"
                description="Homens de 14 anos ou mais de idade, ocupados na semana de referência"
              />
              <br />
              <DropdownContent
                :number="Math.round(currentOccupationWomenChange).toLocaleString('pt-BR')"
                title="Mulheres empregadas"
                description="Mulheres de 14 anos ou mais de idade, ocupadas na semana de referência"
              />
              <br />
              <DropdownContent
                :number="Math.round(currentUnemployedMenChange + currentUnemployedWomenChange).toLocaleString('pt-BR')"
                title="Pessoas desempregadas"
                description="Pessoas de 14 anos ou mais de idade, desocupadas na semana de referência"
              />
              <br />
              <DropdownContent
                :number="Math.round(currentUnemployedMenChange).toLocaleString('pt-BR')"
                title="Homens desempregados"
                description="Homens de 14 anos ou mais de idade, desocupados na semana de referência"
              />
              <br />
              <DropdownContent
                :number="Math.round(currentUnemployedWomenChange).toLocaleString('pt-BR')"
                title="Mulheres desempregadas"
                description="Mulheres de 14 anos ou mais de idade, desocupadas na semana de referência"
              />
              <br />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section">  
            <v-card-title class="section-title">Econômico</v-card-title>
            <v-card-text>
              <br>
              <DropdownContent
                :number="currentHealthExpensesChange.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
                title="Gastos com a saúde"
                description="Total de despesas executadas para a área de atuação Saúde - Esse Ano (2024)"
              />
              <br />
              <DropdownContent
                :number="currentEducationExpensesChange.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
                title="Gastos com a educação"
                description="Total de despesas executadas para a área de atuação Educação -  Esse Ano (2024)"
              />
              <br />
              <DropdownContent
                :number="currentDefenseExpensesChange.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
                title="Gastos com o Ministério da Defesa"
                description="Total de despesas executadas para a área do Ministério da Defesa - DEFESA - Esse Ano (2024)"
              />
              <br />
              <DropdownContent
                :number="currentIncomeMassaChange.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })"
                title="Rendimento de todos os brasileiros"
                description="Massa de rendimento real de todos os trabalhos, habitualmente recebido por mês, pelas pessoas de 14 anos ou mais de idade, ocupadas na semana de referência, com rendimento de trabalho - Esse Ano (2024)"
              />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="cardContainer" cols="12" md="4">
          <v-card class="section">
            <v-card-title class="section-title">Veículos</v-card-title>
            <v-card-text>
              <br />
              <DropdownContent
                :number="Math.round(currentLicenciadosNacionaisChange + currentImportacaoVeiculosChange).toLocaleString('pt-BR')"
                title="Veículos Licenciados"
                description="Veículos Licenciados - Total no ano de 2024"
              />
              <br />
              <DropdownContent
                title="Veículos Exportados do Brasil"
                :number="Math.round(currentExportacaoVeiculosChange).toLocaleString('pt-BR')"
                description="Veículos Exportados - Total no ano de 2024"
              />
              <br />
              <DropdownContent
                title="Veículos Produzidos no Brasil"
                :number="Math.round(currentProducaoVeiculosChange).toLocaleString('pt-BR')"
                description="Veículos Produzidos - Total no ano de 2024"
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
    DropdownContent
  },
  name: 'PopulationDisplay',
};
</script>

<style scoped>
.displayContainer {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 2rem;
}

.container {
  margin-top: 2rem;
  display: grid;
  place-items: center;
}

.cardContainer {
  max-width: 60rem;
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

.dropdown-content p {
  color: rgb(17, 148, 63);
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.5rem;
}

span {
  color: rgb(17, 148, 63);
  font-size: 1.5em;
  font-weight: 600;
  margin: 0.5rem;
}
</style>