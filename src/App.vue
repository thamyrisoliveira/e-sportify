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
            <v-list-item v-for="(item, index) in items" :key="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
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

import usuarioService from '@/service/usuario'
import { getAuth, signOut } from "firebase/auth";

export default {
  name: 'App',

  data: () => ({
    items: [
      { title: 'Criar Usuario' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' },
    ],
  }),
  methods: {
    buscar(evt) {
      console.log(evt.target.value)
      usuarioService.buscarPorNome(evt.target.value)
    },
    signout() {
      const auth = getAuth();
      signOut(auth).then(() => {
        setTimeout(() => {
                this.$router.replace('login');
              }, 2000);
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