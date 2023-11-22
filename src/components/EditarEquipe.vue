<template>
    <v-card elevation="0" class="card-color">
        <v-card-title class="text-md-h6">
            <span class="white--text text-center">Equipe</span>
        </v-card-title>
        <v-card-text class="panel-border">
            <v-form>
                <div>
                    <v-select
                        v-model="equipe"
                        :items="equipes"
                        item-value="id"
                        item-text="nome"
                        label="Equipe"
                        return-object
                        single-line
                        outlined 
                        dense
                        v-on:change="carregaJogadores"
                    ></v-select>
                    <v-select
                        v-model="jogadoresEquipeSelecionada"
                        :items="jogadores"
                        item-value="id"
                        item-text="nome"
                        label="Membros"
                        return-object
                        single-line
                        multiple
                        chips
                        outlined 
                        dense
                    ></v-select>
                </div>
            </v-form>
        </v-card-text>
        <v-card-actions>
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
                @click="limpar">
                Limpar
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapState } from "vuex";
import DatePicker from "@/components/DatePicker";

export default {
  name: 'EditarEquipe',
  components: {DatePicker},
  data: () => ({
    nome: "",
    equipe: null,
    gerente: null,
    membros: [],
    headers: [
        {
          text: 'Nome',
          value: 'nome',
        },
        { text: 'Actions', value: 'actions', sortable: false },
    ]
  }),
  computed: {
      ...mapState({
          jogadores: (state) => state.main.jogadores,
          jogadoresEquipeSelecionada: (state) => state.main.jogadoresEquipeSelecionada,
          equipes: (state) => state.main.equipes,
      }),
      jogadoresEquipeSelecionada : {
        get: function() {
            return this.$store.state.main.jogadoresEquipeSelecionada
        },
        set: function(value) {
            this.$store.commit("main/setJogadoresEquipeSelecionada", value)
        }
      }
      
  },
  beforeCreate() {
    this.$store.dispatch('main/listaUsuarios', 'Jogador')
    this.$store.dispatch('main/listaEquipes')
  },
  methods: {
    salvar() {
        let equipe = {
            id: this.equipe.id,
            membros: this.jogadoresEquipeSelecionada
        }
        this.$store.dispatch('main/atualizaEquipe', equipe)
        this.limpar()
    },
    limpar() {
        this.equipe = null
        this.$store.commit("main/setJogadoresEquipeSelecionada", [])

    },
    carregaJogadores(equipe) {
        this.$store.dispatch('main/carregaJogadoresEquipe', equipe)
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
<style>
#app > div > main > div > div > div > div > div > div.v-card__text.panel-border > form > div:nth-child(2) > div > div.v-data-table__wrapper > table > tbody > tr > td {
    color: black;
}
div > div.v-data-table__wrapper > table > thead > tr > th > span {
    color: black;
}
div.v-data-table__wrapper {
    background: #893037;
}
#app > div > main > div > div > div > div > div > div.v-card__text.panel-border > form > div:nth-child(2) > div > div.v-data-footer {
    background: #893037;
    color: black;
}
#app > div > main > div > div > div > div > div > div.v-card__text.panel-border > form > div:nth-child(2) > div > div.v-data-footer > div.v-data-footer__select {
    color: black;
}
#app > div > main > div > div > div > div > div > div.v-card__text.panel-border > form > div:nth-child(2) > div > div.v-data-footer > div.v-data-footer__pagination {
    color: black;
}
.theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: grey;
}
</style>