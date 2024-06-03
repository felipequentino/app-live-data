<template>
    <header class="header">
        
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderComponent',
  };
  </script>
  
  <style scoped>
  .header {
    background-color: #3b5998;
    color: white;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .navbar {
    margin-top: 10px;
  }
  
  .navbar ul {
    list-style: none;
    padding: 0;
    display: flex;
    gap: 20px;
  }
  
  .navbar ul li {
    margin-bottom: 0;
  }
  
  .navbar ul li a {
    color: white;
    text-decoration: none;
  }
  </style>
  