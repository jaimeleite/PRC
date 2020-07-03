<template>
  <v-card class="ma-2">
    <v-card-title class="primary white--text">
      Lista dos jogadores de ténis
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filtrar"
        label="Filtrar"
        single-line
        hide-details
        dark
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="jogadores"
        :footer-props="footer_props"
        :items-per-page="5"
        :search="filtrar"
        style="max-height:500px; overflow-y: auto;"
      >
          <template v-slot:no-data>
            <v-alert :value="true" color="warning" icon="warning">
              Ainda não foi possível apresentar uma lista dos jogadores...
            </v-alert>
          </template>

          <template v-slot:item.ops="{ item }">
            <v-btn icon small color="primary" @click="mostraJogador(item)">
              <v-icon
              >
                {{ verJogador }}
              </v-icon>
            </v-btn>
          </template>

      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiChevronRightCircleOutline } from '@mdi/js';

export default {
  name: 'ListaJogadores',

data () {
    return {
      search: '',
      headers: [
        { text: 'Id', sortable: true, value: 'idJogador' },
        { text: 'Nome', sortable: true, value: 'nomeJogador' },
        { text: 'Local de nascimento', sortable: true, value: 'nacionalidade' },
        { text: "Ver detalhes", sortable: false, value: 'ops'}
      ],
      pagination: {'sortBy': 'idJogador', 'descending': true},
      footer_props: {
        "items-per-page-text": "Mostrar",
        "items-per-page-options": [5, 10, 20, 50, 100],
        "items-per-page-all-text": "Todos"
      }, 
      jogadores: [],
      filtrar: "",
      verJogador: mdiChevronRightCircleOutline
    }
  },
  created: async function(){
    try {
        let response = await this.$http.get('http://127.0.0.1:4001/jogadores')
        let aux = response.data
        var auxNac = ""

        aux.forEach(element => {
          auxNac = element.localNascimento ? element.localNascimento : "Não definido"
          this.jogadores.push({
              idJogador: String(element.idJogador),
              nomeJogador: element.nomeJogador ? element.nomeJogador : "Não definido",
              nacionalidade: auxNac
          })
        });
    } 
    catch (e) {
      return e;
    }
  },
  methods: {
    mostraJogador(item){
      this.$router.push({ path: "" + item.idJogador})
    }
  }
}
</script>
