<template>
    <div>
       <h1>Real-Time Random Number Display</h1>
       <p>Current Random Number: {{ randomNumber }}</p>
    </div>
    <Bar
    id="live-chart" 
    :options="chartOptions"
    :data="chartData"
    />
   </template>
   
   <script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

   export default {
    name: 'LiveChart',
    components: { Bar },
    computed: {
        chartData() {
            return {
                labels: ['Random Number'],
                datasets: [
                    {
                        label: 'Random Number',
                        backgroundColor: '#f87979',
                        data: [this.randomNumber]
                    }
                ]
            };
        },        
    },
    data() {
       return {
         randomNumber: 0
       };
    },

    mounted() {
       this.generateRandomNumber();
       this.interval = setInterval(this.generateRandomNumber, 1000);
    },
    beforeUnmount() {
       clearInterval(this.interval);
    },
    methods: {
       generateRandomNumber() {
         this.randomNumber = Math.floor(Math.random() * 100) + 1;
       }
    },
   };
   </script>
   
   <style scoped>
   /* Add your CSS styling here if needed */
   </style>
   