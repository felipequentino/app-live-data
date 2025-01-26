<template>
    <div>
      <canvas></canvas>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import { Chart, registerables } from 'chart.js';
  Chart.register(...registerables);
  
  export default {
    name: 'LineChart',
    extends: Line,
    props: {
      labels: {
        type: Array,
        required: true
      },
      historicalData: {
        type: Array,
        required: true
      },
      predictedData: {
        type: Array,
        required: true
      }
    },
    mounted() {
      this.renderChart({
        labels: this.labels,
        datasets: [
          {
            label: 'Dados Históricos',
            data: this.historicalData,
            borderColor: 'blue',
            fill: false
          },
          {
            label: 'Dados Previstos',
            data: this.predictedData,
            borderColor: 'red',
            fill: false
          }
        ]
      }, { responsive: true, maintainAspectRatio: false });
    }
  };
  </script>
  