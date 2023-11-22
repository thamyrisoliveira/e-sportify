<template>
    <v-card elevation="0" class="card-color">
        <v-card-title class="text-md-h6">
            <span class="white--text text-center">Perfil
                <v-btn icon v-if="usuario.completo" @click="iniciarEdicao">
                    <v-icon color="white">mdi-pencil</v-icon>
                </v-btn>
            </span>
        </v-card-title>
        <v-card-text class="panel-border">
            <v-form>
                <div v-if="!usuario.completo && !editar">
                    <v-btn @click="iniciarEdicao">Completar Perfil</v-btn>
                </div>
                <div v-if="editar || usuario.completo">
                    <v-textarea
                        variant="filled"
                        label="Resumo"
                        auto-grow
                        v-model="usuario.resumo"
                        outlined
                        dense
                        :disabled="!editar"
                        ></v-textarea>
                    <v-combobox
                        v-model="usuario.habilidades"
                        label="Principais habilidades"
                        multiple
                        chips
                        dense
                        outlined
                        :disabled="!editar"
                        ></v-combobox>
                    <v-btn @click="adicionarExperiencia" v-if="editar">Adicionar Experiência</v-btn>
                    <span v-else class="white--text text-center">
                        Experiências
                    </span>
                    <div class="mt-4" v-for="experiencia in usuario.experiencias" :key="experiencia.id">
                        <v-card class="card-xp-color" >
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-text-field label="Organização/Equipe" 
                                            outlined 
                                            dense
                                            v-model="experiencia.equipe"
                                            :disabled="!editar"/>
                                    </v-col>
                                    <v-col>
                                        <date-picker
                                            label="Início"
                                            :data-model.sync="experiencia.inicio"
                                            :disabled="!editar"
                                        />
                                    </v-col>
                                    <v-col>
                                        <date-picker
                                            label="Fim"
                                            :data-model.sync="experiencia.fim"
                                            :disabled="!editar"
                                        />
                                    </v-col>
                                    <v-col xs="12" sm="12" md="12">
                                        <v-textarea
                                            variant="filled"
                                            label="Descricao"
                                            auto-grow
                                            v-model="experiencia.descricao"
                                            dense
                                            outlined
                                            :disabled="!editar"
                                            />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </v-form>
        </v-card-text>
        <v-card-actions v-if="editar">
            <v-spacer></v-spacer>
            <v-btn
                tile
                width="100px"
                color="secondary"
                class="button"
                
                @click="salvar">
                Salvar
            </v-btn>
            <v-btn
                outlined
                tile
                width="100px"
                @click="cancelarEdicao">
                Cancelar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapState } from "vuex";
import DatePicker from "@/components/DatePicker";

export default {
  name: 'EditarPerfilCard',
  components: {DatePicker},
  data: () => ({
    resumo: "",
    habilidades: [],
    experiencias: []
  }),
  computed: {
      ...mapState({
          usuario: (state) => state.main.usuario,
          editar: (state) => state.main.editar
      }),
  },
  beforeCreate() {
    this.$store.dispatch('main/carregaPerfil')
  },
  methods: {
    iniciarEdicao() {
        this.$store.commit('main/setEditar', true)
    },
    cancelarEdicao() {
        this.$store.commit('main/setEditar', false)
    },
    adicionarExperiencia() {
        this.$store.commit('main/adicionarExperiencia', {equipe: null, inicio: null, fim: null, descricao: null})
    },
    removerExperiencia(index) {
        this.$store.commit('main/removerExperiencia', index)
    },
    salvar() {
        let usuario = {
            ...this.usuario,
            completo: true
        }
        this.$store.dispatch('main/salvar', usuario)
    }
  }
}

</script>

<style scoped>
.card-color {
    background-color: #D32F2F;
}
.card-xp-color {
    background-color: #B71C1C;
}
</style>