<template>
    <v-container>
      <v-row v-if="usuariosEncontrados.length > 0">
        <v-col v-for="usuario in usuariosEncontrados" :key="usuario.id">
          <user-card :usuario="usuario" />
        </v-col>
      </v-row>
      <v-row v-else class="text-center">
        <v-col cols="12" class="logoico">
          <v-img
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>
        <v-col class="mb-4">
          <h1 class="mb-42">E-Sportify</h1>
          <p class="subtitulo">by gamers, for gamers
          </p>
        </v-col>
        <v-col class="mb-5" cols="12">
          <v-row justify="center">
            <v-btn class="btn-registrar" @click="register" color="#ff4141"><router-link to="/registrar">Começar agora!</router-link></v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

<style>
@import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');

.btn-registrar{
  text-decoration: none !important;
  color: white;
}

.container {
  margin-top: 9rem;
  overflow: hidden;
}


*, mb-42, mb-52 {
  font-family: 'Quantico', sans-serif;
  color: white;
  text-decoration:none !important;
}


.mb-42 {
  margin-top: -3rem;
}

body {
  background-image: url('/src/assets/bg.jpg'); 
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}



.subtitulo {
font-size: 1.2rem
}

.v-application a {
  color: white !important;
}
</style>



<script>
import { mapState } from "vuex";
import UserCard from "./UserCard.vue"

export default {
  name: 'HomeVisitor',
  components: {UserCard},
  computed: {
      ...mapState({
          usuariosEncontrados: (state) => state.main.usuariosEncontrados,
      }),
  },
}
</script>