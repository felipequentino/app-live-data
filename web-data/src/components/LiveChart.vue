<template>
   <div>
     <h1>Real-Time Population Change Display</h1>
     <p>População atual: {{ Math.round(currentPopulationChange) }}</p>
      <p>Pessoas trabalhando: {{ Math.round(currentOccupationChange) }}</p>
      <p>Pessoas desempregadas: {{ Math.round(currentUnemployedChange) }}</p>
      <p>Valor médio do m² no Brasil: {{ Math.round(currentMetroChange) }}</p>
      <p>Valor médio do que um brasileiro ganha: {{ Math.round(currentIncomeChange) }}</p>
   </div>
 </template>
 
 <script>
 import liveChart from './liveChart.js';
 
 export default liveChart;
 </script>
 
 <style scoped>
 /* Add your CSS styling here if needed */
 </style>
 