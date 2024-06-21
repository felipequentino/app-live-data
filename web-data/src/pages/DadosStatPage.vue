<template>
    <div id="app">
      <HeaderComponent />
      <div class="main-content">
        <StaticDisplay />
      </div>
    </div>
  </template>
  
  <script>
  import HeaderComponent from '../components/HeaderComponent.vue';
  import StaticDisplay from '../components/StaticDisplay.vue';
  
  export default {
    name: 'App',
    components: {
      HeaderComponent,
      StaticDisplay,
    },
  };
  </script>
  
  <style scoped>
  .main-content {
    display: flex;
    flex: 1;
  }
  </style>
  