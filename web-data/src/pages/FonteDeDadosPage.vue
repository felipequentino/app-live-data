<template>
  <div class="data-source-container">
    <h1>FONTE DE DADOS</h1>
    <div class="data-source-info">
      <div class="data-source-item">
        <div class="font-weight-medium">
          As fontes de dados usadas no Ludiico Live são provenientes do Sistema IBGE de Recuperação Automática <br> <a href="https://sidra.ibge.gov.br/home/pnadcm" target="_blank">(SIDRA)</a>.
        </div>
      </div>
      <div>
        <p>A partir dessa fonte de dados, são feitas previsões estatísticas a fim de obter informações em "live".</p>
      
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FonteDeDadosPage',
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

</style>
