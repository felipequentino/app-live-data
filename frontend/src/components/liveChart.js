import axios from 'axios';
import Papa from 'papaparse';
const { DateTime } = require('luxon');
import DropdownComponent from './DropdownComponent.vue';


export default {
  components: {
    DropdownComponent
  },
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
      healthExpensesData: [],
      educationExpensesData: [],
      defenseExpensesData: [],

      deathsData: [],
      birthsData: [],
      birthsThisYearData: [],
      deathsThisYearData: [],

      exportacaoVeiculosData: [],
      importacaoVeiculosData: [],
      licenciadosNacionaisData: [],
      producaoVeiculosData: [],

      celularesData: [],

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
      currentHealthExpensesChange: 0,
      currentEducationExpensesChange: 0,
      currentDefenseExpensesChange: 0,

      currentDeathsChange: 0,
      currentBirthsChange: 0,

      currentExportacaoVeiculosChange: 0,
      currentImportacaoVeiculosChange: 0,
      currentLicenciadosNacionaisChange: 0,
      currentProducaoVeiculosChange: 0,

      currentCelularesChange: 0,

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
      healthExpensesInterval: null,
      educationExpensesInterval: null,
      defenseExpensesInterval: null,

      birthsInterval: null,
      deathsInterval: null,

      exportacaoVeiculosInterval: null,
      importacaoVeiculosInterval: null,
      licenciadosNacionaisInterval: null,
      producaoVeiculosInterval: null,

      celularesInterval: null,

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
    this.loadCSVData('/data/data_predicted/predict_gastos_saude.csv', 'healthExpensesData', 'currentHealthExpensesChange', 'healthExpensesInterval');
    this.loadCSVData('/data/data_predicted/predict_gastos_educacao.csv', 'educationExpensesData', 'currentEducationExpensesChange', 'educationExpensesInterval');
    this.loadCSVData('/data/data_predicted/predict_gastos_ministerio_defesa.csv', 'defenseExpensesData', 'currentDefenseExpensesChange', 'defenseExpensesInterval');
    this.loadCSVData('/data/data_predicted/predict_exportacao_veiculos.csv', 'exportacaoVeiculosData', 'currentExportacaoVeiculosChange', 'exportacaoVeiculosInterval');
    this.loadCSVData('/data/data_predicted/predict_licenciados_importados.csv', 'importacaoVeiculosData', 'currentImportacaoVeiculosChange', 'importacaoVeiculosInterval');
    this.loadCSVData('/data/data_predicted/predict_licenciados_nacionais.csv', 'licenciadosNacionaisData', 'currentLicenciadosNacionaisChange', 'licenciadosNacionaisInterval');
    this.loadCSVData('/data/data_predicted/predict_producao_veiculos.csv', 'producaoVeiculosData', 'currentProducaoVeiculosChange', 'producaoVeiculosInterval');
    this.loadCSVData('/data/data_predicted/predict_celulares.csv', 'celularesData', 'currentCelularesChange', 'celularesInterval');
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
    clearInterval(this.healthExpensesInterval);
    clearInterval(this.educationExpensesInterval);
    clearInterval(this.defenseExpensesInterval);

    clearInterval(this.exportacaoVeiculosInterval);
    clearInterval(this.importacaoVeiculosInterval);
    clearInterval(this.licenciadosNacionaisInterval);
    clearInterval(this.producaoVeiculosInterval);

    clearInterval(this.celularesInterval);
  },
  methods: {
    async loadCSVData(url, dataKey, changeKey, intervalKey) {
      try {
        const response = await axios.get(url);
        const csvData = response.data;
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            this.populateDataWithDates(result.data, dataKey);
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
    populateDataWithDates(data, dataKey) {
      // Armazena dados com suas datas para busca correta
      const dataWithDates = [];
      
      for (const row of data) {
        // Tenta obter o valor - pode estar em 'populacao' ou na segunda coluna
        let value = parseFloat(row.populacao);
        
        // Fallback: tenta pegar o segundo valor do objeto (coluna de valor)
        if (isNaN(value)) {
          const values = Object.values(row);
          for (const v of values) {
            const parsed = parseFloat(v);
            if (!isNaN(parsed) && parsed > 100) { // Valor numérico significativo
              value = parsed;
              break;
            }
          }
        }
        
        // Tenta obter a data - pode estar na primeira coluna (índice vazio)
        let dateStr = row[''] || Object.values(row)[0];
        
        if (!isNaN(value) && dateStr && typeof dateStr === 'string' && dateStr.match(/^\d{4}-\d{2}/)) {
          const [year, month] = dateStr.split('-').map(Number);
          dataWithDates.push({ year, month, value });
        }
      }
      
      // Ordena por data
      dataWithDates.sort((a, b) => (a.year * 12 + a.month) - (b.year * 12 + b.month));
      
      // Armazena tanto os valores quanto os metadados
      this[dataKey] = dataWithDates.map(d => d.value);
      this[dataKey + 'Meta'] = dataWithDates;
    },
    findDataForCurrentMonth(dataKey) {
      const meta = this[dataKey + 'Meta'];
      if (!meta || meta.length === 0) {
        return { currentValue: null, nextValue: null, prevValue: null };
      }
      
      const now = DateTime.now().setZone('America/Sao_Paulo');
      const currentYear = now.year;
      const currentMonth = now.month;
      
      // Busca o mês atual nos dados
      let currentIdx = meta.findIndex(d => d.year === currentYear && d.month === currentMonth);
      
      // Fallback: se não encontrar o mês atual, usa o último disponível
      if (currentIdx === -1) {
        // Tenta encontrar o mês mais próximo anterior
        for (let i = meta.length - 1; i >= 0; i--) {
          const d = meta[i];
          if (d.year < currentYear || (d.year === currentYear && d.month <= currentMonth)) {
            currentIdx = i;
            break;
          }
        }
        // Se ainda não encontrou, usa o primeiro disponível
        if (currentIdx === -1) {
          currentIdx = 0;
        }
      }
      
      return {
        currentValue: meta[currentIdx]?.value ?? null,
        nextValue: meta[currentIdx + 1]?.value ?? null,
        prevValue: currentIdx > 0 ? meta[currentIdx - 1]?.value : null,
        currentIdx
      };
    },
    startChangeCalculation(dataKey, changeKey, intervalKey) {
      const { currentValue, nextValue, prevValue } = this.findDataForCurrentMonth(dataKey);
      
      if (currentValue === null) {
        console.error(`No valid data found for ${dataKey}`);
        return;
      }
      
      const now = DateTime.now().setZone('America/Sao_Paulo');
      
      // Calcula a mudança mensal
      let monthlyChange = 0;
      if (nextValue !== null) {
        monthlyChange = nextValue - currentValue;
      } else if (prevValue !== null) {
        // Fallback: usa a taxa do mês anterior
        monthlyChange = currentValue - prevValue;
      }
      
      const predictPerSecond = this.calculatePredictPerSecond(monthlyChange, now);
    
      // Intervalo de 0,1 segundos
      const updateInterval = 0.1;
      const predictPerUpdate = predictPerSecond * updateInterval;
    
      this.updateCurrentChange(currentValue, predictPerSecond, changeKey, now);
      this[intervalKey] = setInterval(() => {
        this[changeKey] += predictPerUpdate;
      }, updateInterval * 1000);
    },
    calculateMonthlyChange(dataKey, currentMonthIndex) {
      // Método mantido para compatibilidade, mas não é mais usado
      if (currentMonthIndex >= this[dataKey].length - 1) {
        if (currentMonthIndex >= 1) {
          return this[dataKey][currentMonthIndex] - this[dataKey][currentMonthIndex - 1];
        }
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
      const daysInCurrentMonth = now.daysInMonth;
      
      const { currentValue } = this.findDataForCurrentMonth(dataKey);
      if (currentValue === null) {
        return;
      }
      
      const deathsMonth = currentValue;
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
      const daysInCurrentMonth = now.daysInMonth;
      
      const { currentValue } = this.findDataForCurrentMonth(dataKey);
      if (currentValue === null) {
        return;
      }
      
      const birthsMonth = currentValue;
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
