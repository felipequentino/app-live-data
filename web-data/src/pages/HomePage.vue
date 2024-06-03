<template>
    <div id="app">
      <HeaderComponent />
      <div class="main-content">
        <PopulationDisplay />
      </div>
    </div>
  </template>
  
  <script>
  import HeaderComponent from '../components/HeaderComponent.vue';
  import PopulationDisplay from '../components/PopulationDisplay.vue';
  
  export default {
    name: 'App',
    components: {
      HeaderComponent,
      PopulationDisplay,
    },
  };
  </script>
  
  <style scoped>
  .main-content {
    display: flex;
    flex: 1;
  }
  </style>
  