<template>
    <div class="align-content-center">
        <p>Crie uma nova conta</p>
        <input
        type="text"
        placeholder="Email"
        v-model="email"
        >
        <br>
        <input
        type="password"
        placeholder="Senha"
        v-model="senha"
        >
        <br>
        <div>
        <v-alert
        v-model="alert"
        color="success"
        icon="$success"
        title="Alert title"
        dismissible :icon="'mdi-checkbox-marked-circle'"
      >
        {{alert_successfull_msg}}
        </v-alert>
        </div>
        <v-btn v-if="!alert" @click="signUp">Registrar</v-btn>
        <v-btn > Cancelar</v-btn>
        <span>
        ou retorne ao
        <router-link to="/login"> login.</router-link>
        </span>
    </div>
</template>
  
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    name: 'signUp',
    data () {
      return {
        email: '',
        senha: '',
        alert: false,
        alert_successfull_msg: "Sua conta foi cadastrada com sucesso!",
        alert_error_msg: "Aconteceu algo inesperado"
      };
    },
    methods: {
      signUp () {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.senha)
        .then(() => {
            this.$router.replace('home'),
              alert(this.alert_successfull_msg)
        })
        .catch((error) => {
            alert(this.alert_error_msg + error.message)
        });
      },
  }
  };
  </script>
  
   <style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    background: #1606f3;
    border: 0;
    padding: 15px;
    color: #ffffff;
    font-size: 20px;
    -webkit-transition: all 0.3 ease;
    transition: all 0.3 ease;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
   /* eslint-disable */
  </style>
  