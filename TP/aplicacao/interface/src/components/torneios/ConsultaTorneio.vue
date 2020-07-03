<template>
  <v-container>
    <v-card class="ma-12">
        <v-card-title v-if="this.nomeTorneio != ''">{{ this.nomeTorneio }} ## {{ this.ano }}</v-card-title>
        <v-card-title v-else>Torneio {{ idTorneio }}(nome não definido) no ano {{ this.ano }}</v-card-title>
        <v-card-text>
            <v-container style="max-height:500px; overflow-y: auto;">
                <v-col>
                    <v-row>
                      <v-col cols="2">
                        <div class="primary--text subtitle-1">Superfície</div>
                        </v-col>
                        <v-col>
                          <div class="--text title">
                            {{ superficie }}
                          </div>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <div class="primary--text subtitle-1">Vencedor</div>
                        </v-col>
                        <v-col v-if="!isDavisCup">
                          <div class="--text title">
                            <a @click="verJogador(finalistas.idVencedor)" v-if="finalistas.nomeVencedor != 'Não definido'">
                              {{ finalistas.nomeVencedor }}
                            </a>
                            <a @click="verJogador(finalistas.idVencedor)" v-else>
                              {{ finalistas.idVencedor }}
                            </a>                            
                          </div>
                        </v-col>
                        <v-col v-else>
                          <b>{{ vencedorDavisCup.nomeVencedor }}</b>
                          <v-spacer></v-spacer>
                          <a style="margin-left: 10px" @click="verJogador(jogador.idJogador)" v-for="jogador in vencedorDavisCup.jogadores" :key="jogador.idJogador">
                            <span v-if="jogador.nomeVencedor != 'Não definido'">{{ jogador.nomeJogador }}</span>
                            <span v-else>{{ jogador.idJogador }}</span>
                          </a>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <div class="primary--text subtitle-1">Finalista</div>
                        </v-col>
                        <v-col v-if="!isDavisCup">
                          <div class="--text title">
                            <a @click="verJogador(finalistas.idPerdedor)" v-if="finalistas.nomePerdedor != 'Não definido'">
                                {{ finalistas.nomePerdedor }}
                            </a>
                            <a @click="verJogador(finalistas.idPerdedor)" v-else>
                              {{ finalistas.idPerdedor }}
                            </a>    
                          </div> 
                        </v-col>
                        <v-col v-else>
                          <div v-for="finalista in finalistasDavisCup" :key="finalista.nomeFinalista">
                            <b>{{ finalista.nomeFinalista }}</b>
                            <v-spacer></v-spacer>
                            <a @click="verJogador(jogador.idJogador)" style="margin-left: 10px" v-for="jogador in finalista.jogadores" :key="jogador.idJogador">
                              <span v-if="jogador.nomeVencedor != 'Não definido'">{{ jogador.nomeJogador }}</span>
                              <span v-else>{{ jogador.idJogador }}</span>
                            </a>
                          </div>
                        </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <div class="primary--text subtitle-1"> Fases
                            <v-btn
                                icon
                                @click="showFases = !showFases"
                            >
                            <v-icon>{{ showFases ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                            <v-expand-transition>
                                <v-row v-show="showFases">
                                    <ul v-if="fases && fases.length > 0">
                                        <li 
                                            v-for="fase in fases"
                                            :key="fase.idFase"
                                        >
                                          <a @click="verFase(fase.idFase)">{{ fase.descricaoFase }}</a>
                                        </li>
                                    </ul>
                                    <div v-else>
                                        <template>
                                            <v-alert :value="true" type="info">
                                                Não existem fases associados a este torneio, neste ano...
                                            </v-alert>
                                        </template>
                                    </div>
                                </v-row>
                            </v-expand-transition>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12">
                        <div class="primary--text subtitle-1"> Participantes
                          <v-btn
                              icon
                              @click="showJogadores = !showJogadores"
                          >
                          <v-icon>{{ showJogadores ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                          </v-btn>
                          <v-expand-transition>
                              <v-row v-show="showJogadores" v-if="!isDavisCup">
                                  <ul v-if="jogadores && jogadores.length > 0">
                                      <li 
                                          v-for="jogador in jogadores"
                                          :key="jogador.idJogador"
                                      >
                                          <a @click="verJogador(jogador.idJogador)" v-if="jogador.nomeJogador != 'Não definido'">{{ jogador.nomeJogador }}</a>
                                          <a @click="verJogador(jogador.idJogador)" v-else>{{ jogador.idJogador }}</a>                                        
                                      </li>
                                  </ul>
                                  <div v-else>
                                      <template>
                                          <v-alert :value="true" type="info">
                                              Não existem jogadores associados a este torneio, neste ano...
                                          </v-alert>
                                      </template>
                                  </div>
                              </v-row>
                              <v-row v-show="showJogadores" v-else>
                                  <ul v-if="jogadores && jogadores.length > 0">
                                      <li 
                                          v-for="equipa in jogadores"
                                          :key="equipa.nomeEquipa"
                                      >
                                          <a @click="mostraJogadores(equipa.nomeEquipa, equipa.descricao)">{{ equipa.nomeEquipa }}</a>
                                      </li>
                                  </ul>
                                  <div v-else>
                                      <template>
                                          <v-alert :value="true" type="info">
                                              Não existem jogadores associados a este torneio, neste ano...
                                          </v-alert>
                                      </template>
                                  </div>
                              </v-row>
                          </v-expand-transition>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row v-if="!isDavisCup">
                      <v-col cols="12">
                        <div class="primary--text subtitle-1"> Observações
                            <v-btn
                                icon
                                @click="showObs = !showObs"
                            >
                            <v-icon>{{ showObs ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                            <v-expand-transition>
                                <v-row v-show="showObs">
                                    <v-list v-if="rankingVencedores && rankingVencedores.length > 0">
                                        <v-card-subtitle>Top 10 jogadores que mais vezes venceram este torneio</v-card-subtitle>
                                          <v-list-item two-line v-for="vencedor in rankingVencedores" :key="vencedor.idVencedor">
                                            <v-list-item-icon>
                                              <v-icon>mdi-chart-donut</v-icon>
                                            </v-list-item-icon>
                                            <v-list-item-content>
                                              <v-list-item-title>
                                                <a @click="verJogador(vencedor.idVencedor)" v-if="vencedor.nomeVencedor != 'Não definido'">
                                                    {{ vencedor.nomeVencedor }}
                                                </a>
                                                <a @click="verJogador(vencedor.idVencedor)" v-else>
                                                  {{ vencedor.idVencedor }}
                                                </a>
                                              </v-list-item-title>
                                              <v-list-item-subtitle>{{ vencedor.numeroTrofeus }} vez(es)</v-list-item-subtitle>
                                            </v-list-item-content>
                                          </v-list-item>
                                    </v-list>
                                    <div v-else>
                                        <template>
                                            <v-alert :value="true" type="info">
                                                Não existe registo acerca dos jogadores com mais troféus deste torneio...
                                            </v-alert>
                                        </template>
                                    </div>
                                </v-row>
                            </v-expand-transition>
                        </div>
                      </v-col>
                    </v-row>
                </v-col>
                <v-dialog v-model="dialog" persistent max-width="500">
                    <v-card>
                        <v-card-title class="primary white--text">{{ this.jogadoresAMostrar.equipa }} - {{ this.ano }}</v-card-title>
                        <v-card-text>
                            <v-list-item-content v-for="jogador in jogadoresAMostrar.jogadores" :key="jogador.idJogador">
                                <v-list-item-title>
                                    <a @click="verJogador(jogador.idJogador)" v-if="jogador.nomeJogador != 'Não definido'">
                                        {{ jogador.nomeJogador }} 
                                    </a>
                                    <a @click="verJogador(jogador.idJogador)" v-else>
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
        </v-card-text>

        <v-card-actions>
            <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
        </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

export default {
  name: 'ConsultaTorneio',
  data: () => ({
      idTorneio: '',
      nomeTorneio: '',
      ano: '',
      superficie: '',
      jogadores: [],
      finalistas: {},
      finalistasDavisCup: [],
      vencedorDavisCup: {},
      jogadoresAMostrar: {},
      rankingVencedores: [],
      fases: [],
      showFases: false,
      showJogadores: false,
      showObs: false,
      dialog: false,
      isDavisCup: false
  }),

  created: async function(){
    this.idTorneio = this.$route.params.idTorneio
    this.nomeTorneio = this.$route.query.nomeTorneio
    this.ano = this.$route.query.ano

    //obtenção dos jogadores que participaram no torneio, para um dado ano + os ID's e os nomes dos finalistas do torneio, para um dado ano
    let response = await this.$http.get('http://127.0.0.1:4001/torneios?idTorneio=' + this.idTorneio + '&ano=' + this.ano)

    this.superficie = response.data.superficie
    this.fases = response.data.fases

    if(String(this.idTorneio) != "DavisCup"){
      this.finalistas = response.data.finalistas[0] 
      this.jogadores = response.data.jogadores

      let obs = await this.$http.get('http://localhost:4001/torneios/' + this.idTorneio + '/maisVitoriosos')

      this.rankingVencedores = obs.data
    }
    else{
      this.isDavisCup = true
      //guarda os finalistas(jogadores agrupados por equipa)
      for (var p in response.data.finalistas) {
        if(p == String(response.data.vencedor)){
          this.vencedorDavisCup = {
            nomeVencedor: p,
            jogadores: response.data.finalistas[p]
          }
        }
        else{
          this.finalistasDavisCup.push({
            nomeFinalista: p,
            jogadores: response.data.finalistas[p]
          })
        }
      }
      //guarda os participantes(jogadores agrupados por equipa)
      let particip = await this.$http.get('http://127.0.0.1:4001/equipas/' + this.ano)

      for (var j in particip.data) {
        this.jogadores.push({
          nomeEquipa: j,
          descricao: particip.data[j]
        })
      }
    }
  },

  methods: {
    mostraJogadores(nomeEquipa, jogadores){
      this.dialog = true

      this.jogadoresAMostrar = {
        equipa: nomeEquipa,
        jogadores: jogadores
      }
    },
    verJogador(idJogador){
      this.$router.push({ path: "/jogadores/" + idJogador})
    },
    verFase(idFase){
      this.$router.push({ path: "fases/" + idFase})
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