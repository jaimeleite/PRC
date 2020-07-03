<template>
  <v-card class="ma-2">
    <v-card-title class="primary white--text">
      Lista das equipas participantes na Davis Cup
      <v-spacer></v-spacer>
      <v-text-field
        v-model="filtrar"
        label="Filtrar"
        single-line
        hide-details
        dark
      ></v-text-field>
    </v-card-title>
    <v-container>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="equipas"
          :footer-props="footer_props"
          :items-per-page="5"
          :search="filtrar"
        >
            <template v-slot:no-data>
              <v-alert :value="true" color="warning" icon="warning">
                Ainda não foi possível apresentar uma lista das equipas...
              </v-alert>
            </template>

            <template v-slot:item.ops="{ item }">
              <v-btn icon small color="primary" @click="mostraEquipa(item)">
                <v-icon
                >
                  {{ verEquipa }}
                </v-icon>
              </v-btn>
            </template>
        </v-data-table>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script>
import { mdiChevronRightCircleOutline } from '@mdi/js';

export default {
  name: 'ListaEquipas',

data () {
    return {
      search: '',
      headers: [
        { text: 'Código', sortable: true, value: 'codigoEquipa'},
        { text: 'Nome', sortable: true, value: 'nomeEquipa'},
        { text: "Ver participações", sortable: false, value: 'ops'}
      ],
      pagination: {'sortBy': 'nomeEquipa', 'descending': true},
      footer_props: {
        "items-per-page-text": "Mostrar",
        "items-per-page-options": [5, 10, 20, 50],
        "items-per-page-all-text": "Todos"
      }, 
      equipas: [],
      filtrar: "",
      verEquipa: mdiChevronRightCircleOutline
    }
  },
  created: async function(){
    try {
        let response = await this.$http.get('http://127.0.0.1:4001/equipas')
        let aux = response.data

        for(let i = 0; i<aux.length; i++){
            this.equipas.push({
                codigoEquipa: aux[i].codigoEquipa,
                nomeEquipa: aux[i].nomeEquipa
            })
        }
    } 
    catch (e) {
      return e;
    }
  },
  methods: {
    mostraEquipa(item){
      this.$router.push({ path: "" + item.nomeEquipa})
    }
  }
}
</script>
