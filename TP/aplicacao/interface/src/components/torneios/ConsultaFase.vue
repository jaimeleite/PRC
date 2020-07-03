<template>
  <v-container>
    <v-card class="ma-12">
        <v-card-title class="primary white--text">Fase {{ idFase }}</v-card-title>
        <v-card-text>
        <v-data-table
              :headers="hpartidas"
              :items="partidas"
              :footer-props="footer_props"
              :items-per-page="5"
              style="max-height:500px; overflow-y: auto;">

              <template v-slot:no-data>
                  <v-alert :value="true" color="warning" icon="warning">
                      Ainda não foi possível apresentar as partidas deste torneio...
                  </v-alert>
              </template>
              
              <template v-slot:item.ops="{ item }">
                  <v-btn icon small color="primary" @click="mostrarPartida(item.idPartida)">
                      <v-icon
                      >
                          {{ verPartida }}
                      </v-icon>
                  </v-btn>
              </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mdiChevronRightCircleOutline } from '@mdi/js';

export default {
  name: 'ConsultaFase',
  data: () => ({
      idFase: '',
      search: '',
      hpartidas: [
          { text: "IdPartida", sortable: true, value: 'idPartida'},
          { text: "IdVencedor", sortable: true, value: 'idVencedor'},
          { text: "Vencedor", sortable: true, value: 'nomeVencedor'},
          { text: "IdPerdedor", sortable: true, value: 'idPerdedor'},
          { text: "Perdedor", sortable: true, value: 'nomePerdedor'},
          { text: "Ver detalhes", value: 'ops'}
      ],
      footer_props: {
          "items-per-page-text": "Mostrar",
          "items-per-page-options": [5, 10, 20, 50, 100],
          "items-per-page-all-text": "Todos"
      },
      partidas: [],
      showPartidas: false,
      verPartida: mdiChevronRightCircleOutline
  }),

  created: async function(){
        this.idFase = this.$route.params.idFase
        let response

        if(String(this.idFase).includes("DavisCup")){
          response = await this.$http.get('http://127.0.0.1:4001/fases/' + this.idFase + '?dcFase=true')
        }
        else{
          response = await this.$http.get('http://127.0.0.1:4001/fases/' + this.idFase) 
        }
        
        this.partidas = response.data
  },

  methods: {
    verJogador(idJogador){
      this.$router.push({ path: "/jogadores/" + idJogador})
    },
    mostrarPartida(idPartida){
      this.$router.push({ path: "/torneios/partidas/" + idPartida})
    }
  }
}

</script>

<style>
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  max-width: 300px;
  margin: auto;
  text-align: center;
  font-family: arial;
}

.title {
  color: grey;
  font-size: 18px;
}

button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 8px;
  color: white;
  background-color: #000;
  text-align: center;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
}

a {
  text-decoration: none;
  font-size: 14px;
  color: black;
}

button:hover, a:hover {
  opacity: 0.7;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
li {
  float: left;
}

li a {
  display: block;
  text-align: center;
  padding: 8px;
}

li a:hover {
  background-color: rgb(5, 75, 133);
}
</style>