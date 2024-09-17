<template>
  <v-card class="navBarContainer">
    <v-layout>
      <v-app-bar color="#003366" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Brasilico</v-toolbar-title>
        <v-spacer></v-spacer>
        <img src="@/assets/logo1.png" alt="Live Data Logo" class="navbar-logo">
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <router-link :to="item.value" class="v-list-item v-list-item" active-class="v-list-item--active">
              <v-list-item-content>
                <v-list-item-title class="item" v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </router-link>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data: () => ({
    drawer: false,
    items: [
      { title: 'Dashboard', value: '/' },
      { title: 'Dados Estáticos', value: '/dados-estaticos' },
      { title: 'Fonte de Dados', value: '/fonte-de-dados' },
      { title: 'Contato', value: '/contato' },
      { title: 'Sobre', value: '/sobre' },
    ],
  }),
  methods: {
    navigateTo(path) {
      window.location.href = path;
    }
  }
};
</script>

<style scoped>
.navBarContainer {
  z-index: 100;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}

.navbar-logo {
  height: 50px;
  width: 50px;
  margin-right: 16px;
}

.item {
  font-size: 1.2em;
  font-weight: 500;
  color: black;
  cursor: pointer;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  transition: border 0.2s;
}

.item:hover {
  border-bottom: 2px solid rgb(0, 51, 102);
}
</style>
