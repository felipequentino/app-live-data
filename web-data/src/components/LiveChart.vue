<template>
   <div>
     <h1>Real-Time Population Change Display</h1>
     <p>Current Population Change: {{ Math.round(currentPopulationChange) }}</p>
     <Bar
       id="live-chart"
       :options="chartOptions"
       :data="chartData"
     />
   </div>
 </template>
 
 <script>
 import liveChart from './liveChart.js';
 
 export default liveChart;
 </script>
 
 <style scoped>
 /* Add your CSS styling here if needed */
 </style>
 