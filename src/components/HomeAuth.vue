<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Bem-vindo {{ usuario.nome }}
        </h1>

        <p class="subheading font-weight-regular">
          Feito por players, para players.
          <br>
        </p>
      </v-col>
      
      <v-col class="mb-5" cols="12" v-if="!usuario.completo">
        <editar-perfil-card />
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
body {
  background-color: #101010;
}


</style>

<script>
import { mapState } from "vuex";
import EditarPerfilCard from "@/components/EditarPerfilCard.vue"

export default {
  name: 'HomeAuth',
  components: {EditarPerfilCard},
  computed: {
      ...mapState({
          usuario: (state) => { 
            return state.main.usuario
          },
      }),
  },
  beforeCreate() {
    this.$store.dispatch('main/carregaPerfil')
  },
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
