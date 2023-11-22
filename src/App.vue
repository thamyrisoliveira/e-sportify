<template>
  <v-app  style="background-color: hsla(0, 0%, 0%, 0)">
    <v-toolbar dark color="#FF4141" title="Menu">
      <div class="text-center">
        <v-menu  offset-y>
          <template v-slot:activator="{ on, attrs }">

            <v-app-bar-nav-icon v-bind="attrs" v-on="on">
            </v-app-bar-nav-icon>
          </template>
          <v-list>
            <v-list-item to="/editar-perfil">
              <v-list-item-title >Editar Perfil</v-list-item-title>
            </v-list-item>
            <v-list-item to="/criar-usuario">
              <v-list-item-title>Criar Usuario</v-list-item-title>
            </v-list-item>
            <v-list-item to="/equipes">
              <v-list-item-title>Equipes</v-list-item-title>
            </v-list-item>
            <v-list-item to="/editar-equipe">
              <v-list-item-title>Gerenciar Equipe</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <v-toolbar-title>E-Sportify</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field hide-details single-line prepend-icon="mdi-magnify" v-on:keyup.enter="buscar">
        <v-tooltip text="Tooltip">
          <template v-slot:activator="{ props }">

          </template>
        </v-tooltip>
      </v-text-field>

      <v-spacer></v-spacer>


      <v-btn icon title="Home">
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn icon title="Estatísticas">
        <v-icon>mdi-chart-line</v-icon>
      </v-btn>

      <v-btn icon title="Ver mais">
        <v-icon>mdi-more</v-icon>
      </v-btn>
      <v-btn icon title="Logout" @click="signout">
        <v-icon>mdi-account-arrow-right</v-icon>
      </v-btn>
    </v-toolbar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

import { getAuth, signOut } from "firebase/auth";

export default {
  name: 'App',

  data: () => ({
  }),
  methods: {
    buscar(evt) {
      this.$store.dispatch('main/buscarUsuarios', evt.target.value)
    },
    signout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        setTimeout(() => {
                this.$router.replace('login');
              }, 1000);
      })
    }
  }
};
</script>

<style>
.v-toolbar {
flex: none;
}
.v-list-item__title {
  color: red
}
</style> 