<template>
  <div id="app">
    <NavbarComponent />
    <component :is="currentPage"></component>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import HomePage from './pages/HomePage.vue';
import ContatoPage from './pages/ContatoPage.vue';
import SobrePage from './pages/SobrePage.vue';
import FonteDeDadosPage from './pages/FonteDeDadosPage.vue';
import FooterComponent from './components/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
    FooterComponent,
    FonteDeDadosPage,
    HomePage,
    ContatoPage,
    SobrePage
  },
  data() {
    return {
      currentPage: 'HomePage' // Página padrão
    };
  },
  created() {
    this.handlePopState();
    window.addEventListener('popstate', this.handlePopState);
  },
  methods: {
    navigateTo(page) {
      this.currentPage = page;
      history.pushState(null, '', page === 'HomePage' ? '/' : `/${page.toLowerCase()}`);
    },
    handlePopState() {
      const path = window.location.pathname.substring(1);
      if (path === 'contato') {
        this.currentPage = 'ContatoPage';
      } else if (path === 'sobre') {
        this.currentPage = 'SobrePage';
      
      } else if (path === 'fonte-de-dados') {
        this.currentPage = 'FonteDeDadosPage';
      } else {
        this.currentPage = 'HomePage';
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
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
