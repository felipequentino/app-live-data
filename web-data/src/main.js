import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, fa } from 'vuetify/iconsets/fa-svg';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { createRouter, createWebHistory } from 'vue-router';
import SobrePage from './pages/SobrePage.vue';
import ContatoPage from './pages/ContatoPage.vue';
import FonteDeDadosPage from './pages/FonteDeDadosPage.vue';
import HomePage from './pages/HomePage.vue';
import './registerServiceWorker'


const app = createApp(App);

const routes = [
  { path: '/sobre', component: SobrePage },
  { path: '/contato', component: ContatoPage },
  { path: '/fonte-de-dados', component: FonteDeDadosPage },
  { path: '/dashboard', component: HomePage },
  { path: '/', component: HomePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.component('font-awesome-icon', FontAwesomeIcon);
library.add(fas, far, fab);

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
});

app.use(vuetify);
app.use(router);

app.mount('#app');
