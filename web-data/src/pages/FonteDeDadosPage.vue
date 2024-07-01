<template>
  <div class="data-source-container">
    <h1>Fonte de Dados</h1>
    <div class="data-source-info">
      <div class="data-source-item">
        <div>
          As fontes de dados usadas no Ludiico Live são provenientes desses dados abaixo:<br><br><a
            href="https://sidra.ibge.gov.br/home/pnadcm" target="_blank">Sistema IBGE de Recuperação Automática e do Sistema de Estatísticas Vitais (IBGE) - SIDRA</a>
            <br>
            <br>
            <a href="https://www.ibge.gov.br/estatisticas/sociais/populacao/9110-estatisticas-do-registro-civil.html?edicao=32267&t=resultados" target="_blank">Sistema de Estatísticas Vitais</a>
            <br>
            <br>
            <a href="https://sidra.ibge.gov.br/pesquisa/pnadca/tabelas" target="_blank">Tabelas do CENSO 2022</a>
        </div>
      </div>
      <div class="data-source-item">
        <p>A partir dessa fonte de dados, são feitas previsões estatísticas a fim de obter informações em tempo real.</p>
      </div>
      <div class="data-source-item">
        <p>
          Ressaltamos que o projeto está sendo atualizado constantemente, e em breve contará com mais dados em tempo real.
        </p>
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
}

h1{
  margin-top: 6rem;
  font-size: 2.5em;
  color: rgb(0, 51, 102);
}

.data-source-info {
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 4rem;
  border-radius: 8px;
  gap: 1rem;
} 

.data-source-item {
  font-size: 1.2em
}
</style>
