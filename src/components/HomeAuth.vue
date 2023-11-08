<template>
 <v-container>
 </v-container>
</template>

<style>
body {
  overflow: hidden;
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
