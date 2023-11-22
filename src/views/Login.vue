<template>
    <div class="login">
      <h1>Login</h1>
      <v-text-field
        v-model="email"
        label="Email"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="senha"
        label="Senha"
        outlined
        type="password"
      ></v-text-field>
      <div class="btn-login">
        <v-btn @click="login" color="success" elevation="2">Login</v-btn>
        <v-btn @click="cancelar" color="primary" elevation="2">Cancelar</v-btn>
      </div>
      <p>
        Não tem uma conta? <span><router-link to="/registrar">Crie uma conta</router-link></span>
      </p>
    </div>
  </template>
  
  <script>
  import { mapState } from "vuex";

  export default {
    name: "login",
    data() {
      return {
        email: "",
        senha: "",
        showSuccessAlert: false,
        successMessage: "",
      };
    },
    computed: {
        ...mapState({
            usuario: (state) => state.main.usuario,
        }),
    },
    methods: {
      login: function() {
        let payload = {
          usuario: {email: this.email, senha: this.senha},
          router: this.$router
        }
        this.$store.dispatch("main/autenticar", payload)
      },
      cancelar: function() {
        this.email = "";
        this.senha = "";
      }
    }
  };
  </script>
  
  <style scoped>
  .login {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
.btn-login {
  margin-top: 20px;
  display: flex;
  flex-direction: row; 
  justify-content: space-between; 
}
  
  p {
    margin-top: 20px;
    font-size: 13px;
  }
  
  p a {
    text-decoration: none;
    font-weight: bold;
    color: #6C2727;
    cursor: pointer;
  }
  </style>