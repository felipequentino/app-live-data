<template>
  <div class="data-source-container">
    <h1>Sobre o Ludiico Live</h1>
    <div class="data-source-item">
      <p>Ludiico Live é um projeto inovador do Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação (PIBITI). Desenvolvido pelo aluno 
        <a :href="lattesAluno" target="_blank" class="lattes-link" @mouseover="showTooltip('lattes do aluno')" @mouseleave="hideTooltip">
          João F. Quentino
        </a>, sob orientação do professor 
        <a :href="lattesOrientador" target="_blank" class="lattes-link" @mouseover="showTooltip('lattes do orientador')" @mouseleave="hideTooltip">
          Hendrik T. Macedo
        </a>, este projeto é parte integrante do grupo Ludiico e tem como objetivo principal exibir informações em tempo real sobre o Brasil.
        <br>
        <br>
      </p>
      <p>
        O site Ludiico Live se destaca por suas previsões de dados altamente precisas e confiáveis, baseadas em modelos preditivos cientificamente comprovados. Utilizando técnicas avançadas de machine learning e análise de dados, o site oferece previsões detalhadas e atualizadas constantemente, garantindo aos usuários uma visão clara e precisa das tendências e eventos atuais no país.
        <br>
        <br>
      </p>
      <p>
        Com o compromisso de fornecer informações de qualidade e apoiar decisões informadas, o Ludiico Live é uma ferramenta essencial para qualquer pessoa interessada em acompanhar e entender melhor a dinâmica brasileira. <br><br> Experimente a precisão e a confiabilidade das previsões do Ludiico Live e fique sempre um passo à frente com dados em tempo real.
        <br>
        <br>
      </p>
    </div>
    <div v-if="tooltip" class="tooltip">{{ tooltip }}</div>
  </div>
</template>

<script>
export default {
  name: 'FonteDeDadosPage',
  data() {
    return {
      lattesAluno: 'http://lattes.cnpq.br/1771023207813424',
      lattesOrientador: 'http://lattes.cnpq.br/7119477874134821',
      tooltip: ''
    };
  },
  methods: {
    showTooltip(text) {
      this.tooltip = text;
    },
    hideTooltip() {
      this.tooltip = '';
    }
  }
};
</script>

<style scoped>
.data-source-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  margin-top: 6rem;
  font-size: 2.5rem;
  color: rgb(0, 39, 79);
}

.data-source-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.data-source-item {
  display: flex;
  flex-direction: column;
  width: 60vw;
  align-items: flex-start;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 2rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  margin-top: 4rem;
  font-size: 1.2em;
  font-weight: 500;
}

.font-weight-medium {
  margin-top: 20px;
}

.lattes-link {
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  margin: 0 5px;
}

.tooltip {
  margin-top: 10px;
  padding: 5px;
  background-color: #333;
  color: #fff;
  border-radius: 5px;
}

/* Media Queries for Mobile Responsiveness */
@media (max-width: 768px) {
  .data-source-item {
    width: 90vw;
    padding: 1rem;
    font-size: 1em;
  }

  h1 {
    font-size: 2rem;
    margin-top: 4rem;
  }
}
</style>