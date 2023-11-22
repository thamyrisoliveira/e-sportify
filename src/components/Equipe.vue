<template>
    <v-card elevation="0" class="card-color">
        <v-card-title class="text-md-h6">
            <span class="white--text text-center">Equipe</span>
        </v-card-title>
        <v-card-text class="panel-border">
            <v-form>
                <div>
                    <v-text-field label="Equipe" 
                        outlined 
                        dense
                        v-model="nome"/>
                    <v-select
                        v-model="gerente"
                        :items="gerentes"
                        item-value="id"
                        item-text="nome"
                        label="Gerente"
                        return-object
                        single-line
                        outlined 
                        dense
                    ></v-select>
                    <v-select
                        v-model="membros"
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
                <div>
                    <v-data-table :items="equipes" :headers="headers">
                        <template v-slot:item.actions="{ item }">
                            <v-btn icon>
                                <v-icon> mdi-pencil </v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon> mdi-delete</v-icon>
                            </v-btn>
                        </template>
                    </v-data-table>
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
  name: 'EditarPerfilCard',
  components: {DatePicker},
  data: () => ({
    nome: "",
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
          gerentes: (state) => state.main.gerentes,
          equipes: (state) => state.main.equipes,
      }),
  },
  beforeCreate() {
    this.$store.commit('main/resetEquipe')
    this.$store.dispatch('main/listaUsuarios', 'Jogador')
    this.$store.dispatch('main/listaUsuarios', 'Gerente')
    this.$store.dispatch('main/listaEquipes')
  },
  methods: {
    itemProps (item) {
        return {
            title: item.nome
        }
    },
    salvar() {
        let equipe = {
            nome: this.nome,
            gerente: this.gerente,
            membros: this.membros
        }
        this.$store.dispatch('main/salvarEquipe', equipe)
        this.limpar()
    },
    limpar() {
        this.nome = ''
        this.gerente = null
        this.membros = []
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