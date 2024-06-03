<template>
  <v-card>
    <v-layout>
      <v-app-bar color="#003366" prominent>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Ludiico Live</v-toolbar-title>
        <v-spacer></v-spacer>
        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify"></v-btn>
          <v-btn icon="mdi-filter"></v-btn>
        </template>
        <v-btn icon="mdi-dots-vertical"></v-btn>
        <img src="@/assets/logo1.png" alt="Live Data Logo" class="navbar-logo">
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <a @click.prevent="navigateTo(item.value)" class="v-list-item">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </a>
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
.navbar-logo {
  height: 50px;
  width: 50px;
  margin-right: 16px;
}
</style>
