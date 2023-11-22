<template>
  <div class="sign-up">
    <v-form ref="form" lazy-validation>
      <h1>Crie uma nova conta</h1>
      <v-select
        v-model="usuario.perfil"
        :items="perfis"
        label="Perfil"
        required
        outlined
      ></v-select>
      <v-text-field
        v-model="usuario.nickname"
        label="Nickname"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="usuario.nome"
        label="Nome"
        :rules="rules.nome"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="usuario.email"
        :rules="rules.email"
        label="Email"
        outlined
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
        <v-btn v-if="!alert_success" @click="criarUsuario" color="success">Registrar</v-btn>
      </div>
    </v-form>
  </div>
    
</template>

<script>
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";
import usuarioService from "@/service/usuario"
export default {
  name: 'CriaUsurioView',
  data() {
    return {
      usuario:{
        perfil: 'Jogador',
        nickname: '',
        nome: null,
        resumo: '',
        habilidades: [],
        experiencias: [],
        completo: false,
        email: '',
        senha: '',
        confirmaSenha: '',
      },
      rules: {
        perfil: [
          value => !!value || "Perfil é obrigatório"
        ],
        nome: [
          value => !!value || "Nome é obrigatório"
        ],
        email: [
          value => !!value || "Email é obrigatório",
          value => /.+@.+/.test(value) || 'E-mail inválido'
        ],
      },
      perfis: ['Jogador', 'Equipe', 'Treinador', 'Gerente', 'CEO'],
      alert_success: false,
      alert_error: false,
      alert_error_msg: "Aconteceu algo inesperado"
    }
  },
  methods: {
    criarUsuario() {
      if (this.$refs.form.validate()) {
        const actionCodeSettings = {
          url: 'http://localhost:8080',
          handleCodeInApp: true,
        };
        const auth = getAuth();
        sendSignInLinkToEmail(auth, this.usuario.email, actionCodeSettings)
          .then(() => {
            this.usuario.uid = auth.currentUser.uid;
            this.completo = false;
            usuarioService.salvar(this.usuario)
            this.alert_success = true;
            setTimeout(() => {
              usuarioService.getUsuarioProfile(auth.currentUser.uid)
                  .then(profile => {
                    profile.uid = auth.currentUser.uid
                      this.$store.commit("main/setUsuario", profile)
                  })
            }, 1000);
          })
          .catch((error) => {
            this.alert_error = true;
            this.alert_error_msg = "Erro: " + error.message;
          });
      }
        
    },
    cancelar() {
      this.email = "";
      this.senha = "";
    }
  }
};
</script>

<style >
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

.v-text-field--outlined > .v-input__control > .v-input__slot {
  background: #893037;
}
.v-text-field--outlined > .v-input__control > .v-select__slot {
  background: #893037;
  
}
.v-select__selection--comma {
  color: black;
}
.v-list-item__content > * {
  line-height: 1.1;
  flex: 1 0 100%;
  color: red;
}
</style>