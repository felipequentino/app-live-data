import axios from 'axios';
import Papa from 'papaparse';
const { DateTime } = require('luxon');

export default {
  data() {
    return {
      populationData: [],
      populationMenData: [],
      populationWomenData: [],
      occupationData: [],
      occupationMenData: [],
      occupationWomenData: [],
      unemployedData: [],
      unemployedMenData: [],
      unemployedWomenData: [],
      metroData: [],
      metroCentroOesteData: [],
      metroNordesteData: [],
      metroNorteData: [],
      metroSudesteData: [],
      metroSulData: [],
      incomeData: [],
      incomeMassaData: [],
      deathsData: [],
      birthsData: [],
      birthsThisYearData: [],
      deathsThisYearData: [],
      birthsToday: 0,
      birthsPerSecond: 0,
      birthsThisYear: 0,
      deathsToday: 0,
      deathsPerSecond: 0,
      deathsThisYear: 0,
      currentPopulationChange: 0,
      currentPopulationMenChange: 0,
      currentPopulationWomenChange: 0,
      currentOccupationChange: 0,
      currentOccupationMenChange: 0,
      currentOccupationWomenChange: 0,
      currentUnemployedChange: 0,
      currentUnemployedMenChange: 0,
      currentUnemployedWomenChange: 0,
      currentMetroChange: 0,
      currentCentroOesteMetroChange: 0,
      currentNordesteMetroChange: 0,
      currentNorteMetroChange: 0,
      currentSudesteMetroChange: 0,
      currentSulMetroChange: 0,
      currentIncomeChange: 0,
      currentIncomeMassaChange: 0,
      currentDeathsChange: 0,
      currentBirthsChange: 0,
      populationInterval: null,
      populationMenInterval: null,
      populationWomenInterval: null,
      occupationInterval: null,
      occupationMenInterval: null,
      occupationWomenInterval: null,
      unemployedInterval: null,
      unemployedMenInterval: null,
      unemployedWomenInterval: null,
      metroInterval: null,
      centroOesteMetroInterval: null,
      nordesteMetroInterval: null,
      norteMetroInterval: null,
      sudesteMetroInterval: null,
      sulMetroInterval: null,
      incomeInterval: null,
      incomeMassaInterval: null,
      birthsInterval: null,
      deathsInterval: null
    };
  },
  mounted() {
    this.loadCSVData('/data/data_predicted/predict_populacao_2024-2025.csv', 'populationData', 'currentPopulationChange', 'populationInterval');
    this.loadCSVData('/data/data_predicted/predict_populacao_H_2024-2025.csv', 'populationMenData', 'currentPopulationMenChange', 'populationMenInterval');
    this.loadCSVData('/data/data_predicted/predict_populacao_M_2024-2025.csv', 'populationWomenData', 'currentPopulationWomenChange', 'populationWomenInterval');
    this.loadCSVData('/data/data_predicted/predict_ocupacao_2024-2025.csv', 'occupationData', 'currentOccupationChange', 'occupationInterval');
    this.loadCSVData('/data/data_predicted/predict_ocupacao_H_2024-2025.csv', 'occupationMenData', 'currentOccupationMenChange', 'occupationMenInterval');
    this.loadCSVData('/data/data_predicted/predict_ocupacao_M_2024-2025.csv', 'occupationWomenData', 'currentOccupationWomenChange', 'occupationWomenInterval');
    this.loadCSVData('/data/data_predicted/predict_desocupados_2024-2025.csv', 'unemployedData', 'currentUnemployedChange', 'unemployedInterval');
    this.loadCSVData('/data/data_predicted/predict_desocupados_H_2024-2025.csv', 'unemployedMenData', 'currentUnemployedMenChange', 'unemployedMenInterval');
    this.loadCSVData('/data/data_predicted/predict_desocupados_M_2024-2025.csv', 'unemployedWomenData', 'currentUnemployedWomenChange', 'unemployedWomenInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_2024-2025.csv', 'metroData', 'currentMetroChange', 'metroInterval');
    this.loadCSVData('/data/data_predicted/predict_rendimento_2024-2025.csv', 'incomeData', 'currentIncomeChange', 'incomeInterval');
    this.loadCSVData('/data/data_predicted/predict_mortes_2024-2025.csv', 'deathsData', 'currentDeathsChange', 'deathsInterval');
    this.loadCSVData('/data/data_predicted/predict_nascimentos_2024-2025.csv', 'birthsData', 'currentBirthsChange', 'birthsInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_centro-oeste.csv', 'centroOesteMetroData', 'currentCentroOesteMetroChange', 'centroOesteMetroInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_nordeste.csv', 'nordesteMetroData', 'currentNordesteMetroChange', 'nordesteMetroInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_norte.csv', 'norteMetroData', 'currentNorteMetroChange', 'norteMetroInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_sudeste.csv', 'sudesteMetroData', 'currentSudesteMetroChange', 'sudesteMetroInterval');
    this.loadCSVData('/data/data_predicted/predict_metro_sul.csv', 'sulMetroData', 'currentSulMetroChange', 'sulMetroInterval');
    this.loadCSVData('/data/data_predicted/predict_dinheiro_massa.csv', 'incomeMassaData', 'currentIncomeMassaChange', 'incomeMassaInterval' );
  },
  beforeUnmount() {
    clearInterval(this.populationInterval);
    clearInterval(this.populationMenInterval);
    clearInterval(this.populationWomenInterval);
    clearInterval(this.birthsInterval);
    clearInterval(this.deathsInterval);
    clearInterval(this.occupationInterval);
    clearInterval(this.occupationMenInterval);
    clearInterval(this.occupationWomenInterval);
    clearInterval(this.unemployedInterval);
    clearInterval(this.unemployedMenInterval);
    clearInterval(this.unemployedWomenInterval);
    clearInterval(this.metroInterval);
    clearInterval(this.centroOesteMetroInterval);
    clearInterval(this.nordesteMetroInterval);
    clearInterval(this.norteMetroInterval);
    clearInterval(this.sulMetroInterval);
    clearInterval(this.sudesteMetroInterval);
    clearInterval(this.incomeInterval);
    clearInterval(this.IncomeMassaInterval);
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
            if (dataKey === 'birthsThisYear') {
              this.calculateBirthsThisYear(dataKey);
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
    
      // Intervalo de 0,2 segundos
      const updateInterval = 0.1; // em segundos
      const predictPerUpdate = predictPerSecond * updateInterval;
    
      this.updateCurrentChange(initialData, predictPerSecond, changeKey, now);
      this[intervalKey] = setInterval(() => {
        this[changeKey] += predictPerUpdate;
      }, updateInterval * 1000); // Convertendo para milissegundos
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
      const secondsElapsedThisYear = now.diff(now.startOf('year'), 'seconds').seconds;

      
      this.deathsPerSecond = deathsToday / (24 * 60 * 60);
      if (!this.deathsThisYearBool) {
        this.deathsThisYear = Math.round(this.deathsPerSecond * secondsElapsedThisYear);
        this.deathsThisYearBool = true; // Initialize deathsThisYear with the value up to now 
      }
      this.updateDeathsToday(now);
      
      this.deathsInterval = setInterval(() => {
        this.deathsToday += this.deathsPerSecond;
        this.deathsThisYear += this.deathsPerSecond; // Increment deathsThisYear
      }, 1000);
    },
    
    updateDeathsToday(now) {
      const secondsElapsedToday = now.diff(now.startOf('day'), 'seconds').seconds;
      this.deathsToday = Math.round(this.deathsPerSecond * secondsElapsedToday);
      this.deathsThisYear += this.deathsToday; // Initialize deathsThisYear with the value up to now
    },

    calculateBirthsToday(dataKey) {
      const now = DateTime.now().setZone('America/Sao_Paulo');
      const currentMonthIndex = now.month - 1; // Luxon months are 1-12, need 0-11
      const daysInCurrentMonth = now.daysInMonth;
      const birthsMonth = this[dataKey][currentMonthIndex];
      const birthsToday = birthsMonth / daysInCurrentMonth;
      const secondsElapsedThisYear = now.diff(now.startOf('year'), 'seconds').seconds;

      this.birthsPerSecond = birthsToday / (24 * 60 * 60);
      if (!this.birthsYearCountBool) {
        this.birthsThisYear = Math.round(this.birthsPerSecond * secondsElapsedThisYear);
        this.birthsYearCountBool = true; // Initialize birthsThisYear with the value up to now
      }

      this.updateBirthsToday(now);

      this.birthsInterval = setInterval(() => {
        this.birthsToday += this.birthsPerSecond;
        this.birthsThisYear += this.birthsPerSecond; 
      }, 1000);
    },

    updateBirthsToday(now) {
      const secondsElapsedToday = now.diff(now.startOf('day'), 'seconds').seconds;
      this.birthsToday = Math.round(this.birthsPerSecond * secondsElapsedToday);
      this.birthsThisYear += this.birthsToday; // Initialize birthsThisYear with the value up to now
    },
  }
};
