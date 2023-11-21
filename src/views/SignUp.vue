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
        v-model="usuario.nome"
        label="Nome de usuário"
        :rules="rules.nome"
        required
        outlined
      ></v-text-field>
      <v-text-field
        v-model="usuario.cpf"  
        label="CPF"
        :rules="rules.cpf"
        required
        outlined
        v-mask="'###.###.###-##'"
      />
      <v-text-field
        v-model="usuario.email"
        :rules="rules.email"
        label="Email"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="usuario.senha"
        label="Senha"
        :rules="rules.senha"
        outlined
        type="password"
      ></v-text-field>
      <v-text-field
        v-model="usuario.confirmaSenha"
        label="Insira a senha novamente"
        :rules="[(value) => rules.confirmaSenha(usuario.senha, value)]"
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
    </v-form>
  </div>
    
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import usuarioService from "@/service/usuario"
import { validarCPF } from "@/helper"
export default {
  name: 'signUp',
  data() {
    return {
      usuario:{
        perfil: 'Jogador',
        nome: null,
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
        cpf: [
          (value) => !!value || "CPF é obrigatório",
          (value) => validarCPF(value) || "CPF inválido",
        ],
        email: [
          value => !!value || "Email é obrigatório",
          value => /.+@.+/.test(value) || 'E-mail inválido'
        ],
        senha: [
          value => !!value || "Senha é obrigatória"
        ],
        confirmaSenha: (senha, confirmacao) => {
          return senha == confirmacao  || 'Senha diferente da confirmação'
        },
      },
      perfis: ['Jogador', 'Time', 'Treinador', 'Manager', 'CEO'],
      alert_success: false,
      alert_error: false,
      alert_error_msg: "Aconteceu algo inesperado"
    }
  },
  methods: {
    signUp() {
      if (this.$refs.form.validate()) {
        const existe = usuarioService.existeCPF(this.usuario.cpf).then(existe => {
          if (existe) {
            this.alert_error = true;
            this.alert_error_msg = "Já existe usuário com este CPF";
            return
          }
          const auth = getAuth();
          createUserWithEmailAndPassword(auth, this.usuario.email, this.usuario.senha)
            .then(() => {
              this.usuario.uid = auth.currentUser.uid;
              this.completo = false;
              usuarioService.salvar(this.usuario)
              this.alert_success = true;
              setTimeout(() => {
                this.$router.replace('home');
              }, 3000);
            })
            .catch((error) => {
              this.alert_error = true;
              this.alert_error_msg = "Erro: " + error.message;
            });
        })
        
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