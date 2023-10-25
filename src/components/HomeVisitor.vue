<template>
    <v-container>
      <v-row class="text-center">


        <v-col cols="12" class="logoico">
          <v-img
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
            height="200"
          />
        </v-col>


        <v-col class="mb-4">
          <h1 class="mb-42">
            Bem-vindo ao E-Sportify
          </h1>
  
          <p class="subheading font-weight-regular">
            Feito por players, para players.
            <br>Para obter mais informações e recursos, faça login ou registre-se.
          </p>
        </v-col>
        
        <v-col class="mb-5" cols="12">
          <h2 class="mb-52">
            Acesse funcionalidades avançadas
          </h2>
  
          <v-row justify="center">
            <v-btn class="btn-registrar" @click="register" color="success"><router-link to="/registrar">Começar agora!</router-link></v-btn>
          </v-row>
        </v-col>
  


      </v-row>
    </v-container>
  </template>
  

<style>
@import url('https://fonts.googleapis.com/css2?family=Quantico&display=swap');

.btn-registrar{
  text-decoration: none;
}

*, mb-42, mb-52 {
  font-family: 'Quantico', sans-serif;
  color: white;
}

body {
  background-image: url('/src/assets/bg.png'); 
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}

.logoico{
  margin-right: 20rem;
  margin-top: 30vh;
  font-size: 1.3rem;
}
 {

}
</style>



<script>
export default {
  name: 'HomeVisitor',
  methods: {  methods: {
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
}
</script>