<template>
  <div class="sign-up">
    <h1>Crie uma nova conta</h1>
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
    <v-alert
      v-if="alert_error"
      type="error"
      transition="scale-transition"
      dismissible
    >
      {{ alert_error_msg }}
    </v-alert>
    <div class="btn-register">
      <v-btn v-if="!alert_success" @click="signUp" color="success">Registrar</v-btn>
      <v-btn @click="cancelar" color="primary">Cancelar</v-btn>
    </div>
    <p>
      Ou retorne ao <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: 'signUp',
  data() {
    return {
      email: '',
      senha: '',
      alert_success: false,
      alert_error: false,
      alert_error_msg: "Aconteceu algo inesperado"
    };
  },
  methods: {
    signUp() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.email, this.senha)
        .then(() => {
          this.alert_success = true;
          setTimeout(() => {
            this.$router.replace('home');
          }, 3000);
        })
        .catch((error) => {
          this.alert_error = true;
          this.alert_error_msg = "Erro: " + error.message;
        });
    },
    cancelar() {
      this.email = "";
      this.senha = "";
    }
  }
};
</script>

<style scoped>
.sign-up {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

v-text-field {
  margin: 10px 0;
  width: 30%;
}

.btn-register {
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