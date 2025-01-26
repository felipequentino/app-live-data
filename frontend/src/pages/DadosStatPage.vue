<template>
    <div id="app">
        <StaticDisplay />
    </div>
  </template>
  
  <script>
  import StaticDisplay from '../components/StaticDisplay.vue';
  
  export default {
    name: 'App',
    components: {
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
  