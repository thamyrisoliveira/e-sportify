<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bem-vindo user x
        </h1>

        <p class="subheading font-weight-regular">
          Feito por players, para players.
          <br>
        </p>
      </v-col>
      
      <v-col class="mb-5" cols="12">
        <h2 class="headline font-weight-bold mb-3">
          aqui vai um card com o perfil do usuário
        </h2>

        <v-row justify="center">
          <v-btn @click="register" color="">Começar agora!</v-btn>
        </v-row>
      </v-col>

      <!-- <v-col cols="12">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col> -->

    </v-row>
  </v-container>
</template>
<style>
body {
  background-color: #101010;
}


</style>

<script>
export default {
  name: 'HomeAuth',
  methods: {
    login() {
      // Redirecionar para a página de login
      this.$router.push('/login');
    },
    register() {
      // Redirecionar para a página de registro
      this.$router.push('/registrar');
    },
  }
}

</script>
