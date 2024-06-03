<template>
  <div class="data-source-container">
    <h1>FONTE DE DADOS</h1>
    <div class="data-source-info">
    </div>
    <div class="font-weight-medium">
      O Ludiico Live é um Programa Institucional de Bolsas de Iniciação em Desenvolvimento Tecnológico e Inovação (PIBITI), com foco em exibir informações em tempo real sobre o Brasil. O projeto está sendo desenvolvido através do grupo Ludiico, pelo aluno 
      <a :href="lattesAluno" target="_blank" class="lattes-link" @mouseover="showTooltip('lattes do aluno')" @mouseleave="hideTooltip">
        João F. Quentino
      </a>
      e pelo orientador 
      <a :href="lattesOrientador" target="_blank" class="lattes-link" @mouseover="showTooltip('lattes do orientador')" @mouseleave="hideTooltip">
        Hendrik T. Macedo
      </a>.
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
  margin-bottom: 20px;
}

.data-source-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.data-source-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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
</style>
