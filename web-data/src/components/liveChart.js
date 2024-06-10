import axios from 'axios';
import Papa from 'papaparse';
const { DateTime } = require('luxon');

export default {
  data() {
    return {
      populationData: [],
      occupationData: [],
      unemployedData: [],
      metroData: [],
      incomeData: [],
      deathsData: [],
      birthsData: [],
      birthsToday: 0,
      birthsPerSecond: 0,
      deathsToday: 0,
      deathsPerSecond: 0,
      currentPopulationChange: 0,
      currentOccupationChange: 0,
      currentUnemployedChange: 0,
      currentMetroChange: 0,
      currentIncomeChange: 0,
      currentDeathsChange: 0,
      currentBirthsChange: 0,
      populationInterval: null,
      occupationInterval: null,
      unemployedInterval: null,
      metroInterval: null,
      incomeInterval: null,
      birthsInterval: null,
      deathsInterval: null
    };
  },
  mounted() {
    this.loadCSVData('/data/data_predicted/predict_populacao_2024-2025.csv', 'populationData', 'currentPopulationChange', 'populationInterval');
    this.loadCSVData('/data/data_predicted/predict_ocupacao_2024-2025.csv', 'occupationData', 'currentOccupationChange', 'occupationInterval');
    this.loadCSVData('/data/data_predicted/predict_desocupados_2024-2025.csv', 'unemployedData', 'currentUnemployedChange', 'unemployedInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_2024-2025.csv', 'metroData', 'currentMetroChange', 'metroInterval');
    this.loadCSVData('/data/data_predicted/predict_rendimento_2024-2025.csv', 'incomeData', 'currentIncomeChange', 'incomeInterval');
    this.loadCSVData('/data/data_predicted/predict_mortes_2024-2025.csv', 'deathsData', 'currentDeathsChange', 'deathsInterval');
    this.loadCSVData('/data/data_predicted/predict_nascimentos_2024-2025.csv', 'birthsData', 'currentBirthsChange', 'birthsInterval')
  },
  beforeUnmount() {
    clearInterval(this.populationInterval);
    clearInterval(this.birthsInterval);
    clearInterval(this.deathsInterval);
    clearInterval(this.occupationInterval);
    clearInterval(this.unemployedInterval);
    clearInterval(this.metroInterval);
    clearInterval(this.incomeInterval);
  },
  methods: {
    async loadCSVData(url, dataKey, changeKey, intervalKey) {
      try {
        const response = await axios.get(url);
        const csvData = response.data;
        Papa.parse(csvData, {
          header: true,
          complete: (result) => {
            this.populateData(result.data, dataKey);
            this.startChangeCalculation(dataKey, changeKey, intervalKey);
            if (dataKey === 'deathsData') {
              this.calculateDeathsToday(dataKey);
            }
            if (dataKey === 'birthsData') {
              this.calculateBirthsToday(dataKey);
            }
          }
        });
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    },
    populateData(data, dataKey) {
      this[dataKey] = data.map(row => parseFloat(row.populacao));
    },
    startChangeCalculation(dataKey, changeKey, intervalKey) {
      if (this[dataKey].length < 2) {
        console.error('Not enough data to calculate change.');
        return;
      }

      const now = DateTime.now().setZone('America/Sao_Paulo');
      const currentMonthIndex = now.month - 1; // Luxon months are 1-12, need 0-11
      const initialData = this[dataKey][currentMonthIndex];
      const monthlyChange = this.calculateMonthlyChange(dataKey, currentMonthIndex);
      const predictPerSecond = this.calculatePredictPerSecond(monthlyChange, now);

      this.updateCurrentChange(initialData, predictPerSecond, changeKey, now);
      this[intervalKey] = setInterval(() => {
        this[changeKey] += predictPerSecond;
      }, 1000);
    },
    calculateMonthlyChange(dataKey, currentMonthIndex) {
      if (currentMonthIndex >= this[dataKey].length - 1) {
        console.error('Not enough data to calculate monthly change for the current month.');
        return 0;
      }
      return this[dataKey][currentMonthIndex + 1] - this[dataKey][currentMonthIndex];
    },
    calculatePredictPerSecond(monthlyChange, now) {
      const secondsInMonth = this.calculateSecondsInMonth(now);
      return monthlyChange / secondsInMonth;
    },
    calculateSecondsElapsed(now) {
      const firstDayOfMonth = now.startOf('month');
      return now.diff(firstDayOfMonth, 'seconds').seconds;
    },
    calculateSecondsInMonth(now) {
      const daysInMonth = now.daysInMonth;
      return daysInMonth * 24 * 60 * 60;
    },
    updateCurrentChange(initialData, predictPerSecond, changeKey, now) {
      const secondsElapsed = this.calculateSecondsElapsed(now);
      this[changeKey] = initialData + predictPerSecond * secondsElapsed;
    },

    calculateDeathsToday(dataKey) {
      const now = DateTime.now().setZone('America/Sao_Paulo');
      const currentMonthIndex = now.month - 1; // Luxon months are 1-12, need 0-11
      const daysInCurrentMonth = now.daysInMonth;
      const deathsMonth = this[dataKey][currentMonthIndex];
      const deathsToday = deathsMonth / daysInCurrentMonth;

      this.deathsPerSecond = deathsToday / (24 * 60 * 60);
      this.updateDeathsToday(now);

      this.deathsInterval = setInterval(() => {
        this.deathsToday += this.deathsPerSecond;
      }, 1000);
    },
    
    updateDeathsToday(now) {
      const secondsElapsedToday = now.diff(now.startOf('day'), 'seconds').seconds;
      this.deathsToday = this.deathsPerSecond * secondsElapsedToday;
    },

    calculateBirthsToday(dataKey) {
      const now = DateTime.now().setZone('America/Sao_Paulo');
      const currentMonthIndex = now.month - 1; // Luxon months are 1-12, need 0-11
      const daysInCurrentMonth = now.daysInMonth;
      const birthsMonth = this[dataKey][currentMonthIndex];
      const birthsToday = birthsMonth / daysInCurrentMonth;

      this.birthsPerSecond = birthsToday / (24 * 60 * 60);
      this.updateBirthsToday(now);

      this.birthsInterval = setInterval(() => {
        this.birthsToday += this.birthsPerSecond;
      }, 1000);
    },

    updateBirthsToday(now) {
      const secondsElapsedToday = now.diff(now.startOf('day'), 'seconds').seconds;
      this.birthsToday = this.birthsPerSecond * secondsElapsedToday;
    },
  }
};
