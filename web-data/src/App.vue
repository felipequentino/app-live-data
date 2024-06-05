<template>
  <div id="app">
    <NavbarComponent />
    <router-view />
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>