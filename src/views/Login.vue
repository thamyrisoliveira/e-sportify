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
      <v-alert
          v-if="!showSuccessAlert"
          type="$success"
          transition="scale-transition"
          dismissible
        >
          {{ successMessage }}
        </v-alert>
      <p>
        Não tem uma conta? <span><router-link to="/registrar">Crie uma conta</router-link></span>
      </p>
    </div>
  </template>
  
  <script>
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    
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
    methods: {
      login: function() {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.senha)
          .then((user) => {
            this.successMessage = `Bem-vindo, ${this.email}`;
            this.showSuccessAlert = true;
            this.$router.replace("/homeauth");
          })
          .catch((error) => {
            alert("Não foi possível realizar o login. " + error.message);
          });
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