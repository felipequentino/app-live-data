import axios from 'axios';
import Papa from 'papaparse';

export default {
  data() {
    return {
      populationData: [],
      occupationData: [],
      unemployedData: [],
      metroData: [],
      incomeData: [],
      currentPopulationChange: 0,
      currentOccupationChange: 0,
      currentUnemployedChange: 0,
      currentMetroChange: 0,
      currentIncomeChange: 0,
      populationInterval: null,
      occupationInterval: null,
      unemployedInterval: null,
      metroInterval: null,
      incomeInterval: null
    };
  },
  mounted() {
    this.loadCSVData('/data/data_predicted/predict_populacao_2024-2025.csv', 'populationData', 'currentPopulationChange', 'populationInterval');
    this.loadCSVData('/data/data_predicted/predict_ocupacao_2024-2025.csv', 'occupationData', 'currentOccupationChange', 'occupationInterval');
    this.loadCSVData('/data/data_predicted/predict_desocupados_2024-2025.csv', 'unemployedData', 'currentUnemployedChange', 'unemployedInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_2024-2025.csv', 'metroData', 'currentMetroChange', 'metroInterval');
    this.loadCSVData('/data/data_predicted/predict_rendimento_2024-2025.csv', 'incomeData', 'currentIncomeChange', 'incomeInterval');
  },
  beforeUnmount() {
    clearInterval(this.populationInterval);
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

      const initialData = this[dataKey][0];
      const monthlyChange = this.calculateMonthlyChange(dataKey);
      const predictPerSecond = this.calculatePredictPerSecond(monthlyChange);

      this.updateCurrentChange(initialData, predictPerSecond, changeKey);
      this[intervalKey] = setInterval(() => {
        this[changeKey] += predictPerSecond;
      }, 1000);
    },
    calculateMonthlyChange(dataKey) {
      return this[dataKey][1] - this[dataKey][0];
    },
    calculatePredictPerSecond(monthlyChange) {
      const now = new Date();
      const secondsInMonth = this.calculateSecondsInMonth(now);

      return monthlyChange / secondsInMonth;
    },
    calculateSecondsElapsed(now) {
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      return (now - firstDayOfMonth) / 1000; // Convert milliseconds to seconds
    },
    calculateSecondsInMonth(now) {
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      return daysInMonth * 24 * 60 * 60;
    },
    updateCurrentChange(initialData, predictPerSecond, changeKey) {
      const now = new Date();
      const secondsElapsed = this.calculateSecondsElapsed(now);

      this[changeKey] = initialData + predictPerSecond * secondsElapsed;
    }
  }
};
