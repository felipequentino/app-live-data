import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
import Papa from 'papaparse';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'LiveChart',
  components: { Bar },
  data() {
    return {
      populationData: [],
      currentPopulationChange: 0,
      interval: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  computed: {
    chartData() {
      return {
        labels: ['Population Change'],
        datasets: [
          {
            label: 'Population Change',
            backgroundColor: '#f87979',
            data: [this.currentPopulationChange]
          }
        ]
      };
    }
  },
  mounted() {
    this.loadCSVData();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    async loadCSVData() {
      try {
        const response = await axios.get('/data/predict_populacao_2024-2025.csv');
        const csvData = response.data;
        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            this.populatePopulationData(result.data);
            this.startPopulationChangeCalculation();
          }
        });
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    },
    populatePopulationData(data) {
      this.populationData = data.map(row => parseFloat(row.populacao));
    },
    startPopulationChangeCalculation() {
      if (this.populationData.length < 2) {
        console.error('Not enough data to calculate population change.');
        return;
      }

      const initialPopulation = this.populationData[0];
      const monthlyPopulationChange = this.calculateMonthlyPopulationChange();
      const predictPerSecond = this.calculatePredictPerSecond(monthlyPopulationChange);

      this.updateCurrentPopulationChange(initialPopulation, predictPerSecond);
      this.interval = setInterval(() => {
        this.currentPopulationChange += predictPerSecond;
      }, 1000);
    },
    calculateMonthlyPopulationChange() {
      return this.populationData[1] - this.populationData[0];
    },
    calculatePredictPerSecond(monthlyPopulationChange) {
      const now = new Date();
      const secondsInMonth = this.calculateSecondsInMonth(now);

      return monthlyPopulationChange / secondsInMonth;
    },
    calculateSecondsElapsed(now) {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return (now - firstDayOfMonth) / 1000; // Convert milliseconds to seconds
    },
    calculateSecondsInMonth(now) {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      return daysInMonth * 24 * 60 * 60;
    },
    updateCurrentPopulationChange(initialPopulation, predictPerSecond) {
      const now = new Date();
      const secondsElapsed = this.calculateSecondsElapsed(now);

      this.currentPopulationChange = initialPopulation + predictPerSecond * secondsElapsed;
    }
  }
};
