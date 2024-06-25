<template>
    <div class="tooltip-container">
      <span @mouseover="showTooltip" @mouseleave="hideTooltip" @click="toggleTooltip">{{ displayText }}</span>
      <div v-if="isTooltipVisible" class="tooltip">
        {{ tooltipText }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TooltipComponent',
    props: {
      displayText: {
        type: String,
        required: true
      },
      tooltipText: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        isTooltipVisible: false
      };
    },
    methods: {
      showTooltip() {
        this.isTooltipVisible = true;
      },
      hideTooltip() {
        this.isTooltipVisible = false;
      },
      toggleTooltip() {
        this.isTooltipVisible = !this.isTooltipVisible;
      }
    }
  };
  </script>
  
  <style scoped>
.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  z-index: 1; /* Ensure tooltip appears above other elements */
}

.tooltip-container span {
  color: #000000;
  font-size: 1.5em;
  font-weight: 600;
}

.tooltip {
  visibility: visible;
  background-color: #000;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 5px;
  position: absolute;
  bottom: 150%; /* Adjusted to give a bit more space between text and tooltip */
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.9;
  max-width: 500px; /* Maximum width of the tooltip */
  min-width: 290px; /* Minimum width of the tooltip */
}

.tooltip::after {
  content: '';
  position: absolute;
  top: 100%; 
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent; 
}
</style>