<template>
    <div v-if="!this.loaded">
        Loading...
    </div>
    <v-card class="ma-12" v-else>
        <v-card-title class="primary white--text">
            <span class="headline">Equipa {{ this.nomeEquipa }}</span>
            <v-container>
                <country-flag :country=codigoEquipa size='big'/>
            </v-container>
        </v-card-title>

        <v-container style="max-height:400px; overflow-y: auto;">
            <v-simple-table fixed-header>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-center">Ano</th>
                        <th class="text-center">Número de jogadores</th>
                        <th class="text-center">Ver info</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(jogadores, ano) in equipa" :key="ano">
                            <td class="text-center">{{ ano }}</td>
                            <td class="text-center">{{ jogadores.length }}</td>
                            <td class="text-center">
                                <v-btn icon small color="primary" @click="mostrarInfoEquipa(ano, jogadores)">
                                    <v-icon>
                                        {{ verInfo }}
                                    </v-icon>
                                </v-btn>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <v-dialog v-model="dialog" persistent max-width="500">
                <v-card>
                    <v-card-title class="primary white--text"> {{ this.nomeEquipa }} - {{ this.anoEscolhido }} </v-card-title>
                    <v-card-text>
                        <v-list-item-content v-for="jogador in jogadoresDeAno" :key="jogador.idJogador">
                            <v-list-item-title>
                                <a @click="mostraJogador(jogador)" v-if="jogador.nomeJogador != 'Não definido'">
                                     {{ jogador.nomeJogador }} 
                                </a>
                                <a @click="mostraJogador(jogador)" v-else>
                                     {{ jogador.idJogador }} 
                                </a>
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="green darken-1" text @click="dialog = false">
                            OK
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-container>
        <v-card-actions>
            <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mdiArrowRightDropCircle } from '@mdi/js';
import CountryFlag from 'vue-country-flag'

export default {
  name: 'ConsultaEquipa',
  data: () => ({
    equipa: {},
    nomeEquipa: "",
    nome: false,
    loaded: false,
    show: false,
    verInfo: mdiArrowRightDropCircle,
    dialog: false,
    anoEscolhido: -1,
    jogadoresDeAno: [],
    codigoEquipa: 'fr'
  }),

  components: {
      CountryFlag
  },

  created: async function(){
      try{
        this.nomeEquipa = this.$route.params.nomeEquipa

        let response = await this.$http.get('http://127.0.0.1:4001/equipas/individual/' + this.nomeEquipa)

        this.equipa = response.data.info

        this.codigoEquipa = response.data.codigoEquipa

        this.loaded = true

      }
      catch (e) {
          return e;
      }
  },

  methods: {
    escolherAno(idTorneio, nomeTorneio){
        this.$router.push({path: "/torneios/escolherAno", query: {idTorneio: idTorneio, nomeTorneio: nomeTorneio}})
    },
    mostrarInfoEquipa(ano, jogadores){
        this.dialog = true

        this.anoEscolhido = ano
        this.jogadoresDeAno = jogadores
    },
    mostraJogador(jogador){
        this.$router.push({ path: "../jogadores/" + jogador.idJogador})
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

.scroll {
    overflow-y: auto;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>