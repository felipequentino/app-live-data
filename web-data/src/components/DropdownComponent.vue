<template>
  <div class="dropdown">
    <div class="dropdown-title" @click="toggleDropdown">
      <!-- Número e título alinhados horizontalmente em desktop -->
      <div class="title-container" v-if="!isMobile">
        <span class="number" style="color: rgb(17, 148, 63);">{{ number }}</span>
        <span class="title">{{ title }}</span>
      </div>
      <!-- Número acima do título em dispositivos móveis -->
      <div class="title-container" v-else>
        <span class="number" style="color: rgb(17, 148, 63);">{{ number }}</span>
        <span class="title">{{ title }}</span>
      </div>
      <!-- Ícone de expansão/retração -->
      <span v-if="!isOpen">[+]</span>
      <span v-else>[-]</span>
    </div>
    <transition name="slide">
      <div class="dropdown-content" v-show="isOpen">
        <p>{{ description }}</p>
        <canvas v-if="dataArray" ref="chartCanvas"></canvas>
        <strong>Fonte: </strong>
        <a :href="fonte" target="_blank" rel="noopener noreferrer">{{ fonte_description }}</a>
      </div>
    </transition>
  </div>
</template>

  
<script>

import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export default {
  name: "DropdownContent",
  props: {
    number: {
      type: [String, Number], // Allow both string and number
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    fonte: {
      type: String,
      required: false
    },
    fonte_description: {
      type: String,
      required: false
    },
    dataArray: {
      type: Array,
      required: false,
      default: null
    }
  },
  data() {
    return {
      isOpen: false,
      isMobile: false // Flag para verificar se é mobile
    };
  },
  mounted() {
    // Verifica se a largura da janela é menor que 768px (exemplo para dispositivos móveis)
    this.isMobile = window.innerWidth < 768;
    // Adiciona um listener de redimensionamento para atualizar a flag isMobile
    window.addEventListener('resize', this.checkMobile);
  },
  unmounted() {
    // Remove o listener de redimensionamento ao destruir o componente
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      if (this.isOpen && !this.chartInstance && this.dataArray) {
        this.$nextTick(() => {
          this.createChart();
        });
      } else if (!this.isOpen && this.chartInstance) {
        // Destrói o gráfico quando o dropdown é fechado
        this.chartInstance.destroy();
        this.chartInstance = null;
      }
    },
    createChart() {
        if (!this.dataArray || this.dataArray.length === 0) {
      return; // Não tenta criar o gráfico se dataArray não existir ou estiver vazio
    }
    
      const ctx = this.$refs.chartCanvas.getContext('2d');
      const now = new Date();
      const currentMonthIndex = now.getMonth();

      const labels = this.dataArray.map((_, index) => {
        return new Date(0, index).toLocaleString('default', { month: 'short' });
      });

      const pastData = this.dataArray.map((value, index) => index <= currentMonthIndex ? value : null);
      const futureData = this.dataArray.map((value, index) => index > currentMonthIndex ? value : null);

      this.chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Passado/Atual',
              data: pastData,
              borderColor: 'blue',
              backgroundColor: 'blue',
              fill: false,
              tension: 0.1
            },
            {
              label: 'Futuro',
              data: futureData,
              borderColor: 'red',
              backgroundColor: 'red',
              fill: false,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Mês'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Valor'
              },
              beginAtZero: true
            }
          }
        }
      });
    }
  }
};
</script>
  
  <style scoped>
  .dropdown {
    margin-bottom: 10px;
  }
  
  .dropdown-title {
    cursor: pointer;
    background-color: #f5f5f5;
    padding: 10px;
    border: 1px solid #ddd;
    display: flex; /* Tornando o título um contêiner flexível */
    justify-content: space-between; /* Colocando espaço máximo entre o título e o sinal */
  }
  
  .title-container {
  display: flex;
  flex-direction: row; /* Alinha o número e o título horizontalmente */
  position: relative; /* Necessário para posicionar o título absolutamente */
  width: 100%; /* Ocupa toda a largura disponível */
}

.number {
  font-size: 1.5em; /* Tamanho do número */
  font-weight: bold;
  flex-shrink: 0; /* Impede que o número encolha e afete a posição do título */
}

.title {
  font-size: 1.2em; /* Tamanho do título */
  position: absolute; /* Posiciona o título absolutamente */
  left: 60%; /* Posiciona o título um pouco à direita do centro */
}

@media (max-width: 767px) {
  .title-container {
    flex-direction: column; /* Alterado para coluna para mobile */
    align-items: flex-start; /* Alinha o número e o título ao início do contêiner */
  }

  .title {
    position: static; /* Remove a posição absoluta na visualização mobile */
    left: auto; /* Remove o deslocamento à direita na visualização mobile */
  }
}


  
  .dropdown-content {
    overflow: hidden;
    border: 1px solid #ddd;
    border-top: none;
    padding: 10px;
    background-color: #fff;
  }

  .dropdown-content canvas {
  width: 100%;
  max-width: 100%;
  height: 400px;
  max-height: 400px;
}

  
  /* Definindo a animação de transform */
  @keyframes slide {
    from {
      transform: scaleY(0);
      transform-origin: top;
    }
    to {
      transform: scaleY(1);
      transform-origin: top;
    }
  }
  
  .slide-enter-active, .slide-leave-active {
    animation-name: slide;
    animation-duration: 0.5s;
    animation-fill-mode: forwards; /* Garante que a animação termine na posição final */
  }
  
  /* Aplicando a animação de entrada */
  .slide-enter {
    animation-play-state: running;
  }
  
  /* Aplicando a animação de saída */
  .slide-leave-active {
    animation-direction: reverse;
  }
  </style>
  