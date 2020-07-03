<template>
    <div v-if="!this.loaded" :key="componentKey">
        Loading...
    </div>
    <v-card class="ma-12" v-else :key="componentKey">
        <v-card-title class="primary white--text">
            <span class="headline">{{ this.jogador.nomeJogador }}</span>
            <v-spacer></v-spacer>
            <span>
                <country-flag :country=jogador.codigoPais size='big'/>
            </span>
        </v-card-title>

        <v-card-text>
            <v-container style="max-height:500px; overflow-y: auto;">
                <v-row justify="center">
                    <v-col cols="8">
                        <v-row>
                            <v-col cols="4">
                                <div class="primary--text subtitle-1">Id</div>
                            </v-col>
                            <v-row class="pl-12">
                                <v-col cols="4" style="text-align:left">
                                    <div class="--text title">{{ this.idJogador }}</div>
                                </v-col>
                            </v-row>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="primary--text subtitle-1">Data de nascimento</div>
                            </v-col>
                            <v-row class="pl-12">
                                <v-col cols="4" style="text-align:left">
                                    <div class="--text title">{{ this.jogador.dataNas }}</div>
                                </v-col>
                            </v-row>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="primary--text subtitle-1">Local de nascimento</div>
                            </v-col>
                            <v-row class="pl-12">
                                <v-col cols="4.3" style="text-align:left">
                                    <div class="--text title">{{ this.jogador.localNas }}</div>
                                </v-col>
                            </v-row>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="primary--text subtitle-1">Melhor mão</div>
                            </v-col>
                            <v-row class="pl-12">
                                <v-col cols="4" style="text-align:left">
                                    <div class="--text title">{{ this.jogador.melhorMao }}</div>
                                </v-col>
                            </v-row>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="primary--text subtitle-1">Vitórias</div>
                            </v-col>
                            <v-row class="pl-12">
                                <v-col cols="4" style="text-align:left">
                                    <div class="--text title">{{ this.jogador.vitorias }}</div>
                                </v-col>
                            </v-row>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <div class="primary--text subtitle-1">Derrotas</div>
                            </v-col>
                            <v-row class="pl-12">
                                <v-col cols="4" style="text-align:left">
                                    <div class="--text title">{{ this.jogador.derrotas }}</div>
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-col>
                    <v-col cols="4" class="pr-2">
                        <v-img :src=imagem max-width="70%">
                        </v-img>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <div class="primary--text subtitle-1">Torneios
                            <v-btn
                                icon
                                @click="showTorneios = !showTorneios"
                            >
                            <v-icon>{{ showTorneios ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                            <v-expand-transition>
                                <v-row v-show="showTorneios">
                                    <ul v-if="jogador.torneios && jogador.torneios.length > 0">
                                        <li 
                                            v-for="torneio in jogador.torneios"
                                            :key="torneio.idTorneio"
                                        >
                                            <a @click="escolherAno(torneio.idTorneio, torneio.nomeTorneio)">{{ torneio.nomeTorneio }}</a>
                                        </li>
                                    </ul>
                                    <div v-else>
                                        <template>
                                            <v-alert :value="true" type="info">
                                                Não existem torneios associados a este jogador...
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
                        <div class="primary--text subtitle-1">Equipas em que participou
                            <v-btn
                                icon
                                @click="showEquipas = !showEquipas"
                            >
                            <v-icon>{{ showEquipas ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                            <v-expand-transition>
                                <v-row v-show="showEquipas">
                                    <ul v-if="equipas && equipas.length > 0">
                                        <li 
                                            v-for="equipa in equipas"
                                            :key="equipa.idEquipa"
                                        >
                                            <a @click="mostraJogadores(equipa.nomePais, equipa.ano)">
                                                {{ equipa.idEquipa }}
                                            </a>
                                        </li>
                                    </ul>
                                    <div v-else>
                                        <template>
                                            <v-alert :value="true" type="info">
                                                Não existem equipas associadas a este jogador...
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
                        <div class="primary--text subtitle-1">Títulos individuais
                            <v-btn
                                icon
                                @click="showTitulos = !showTitulos"
                            >
                            <v-icon>{{ showTitulos ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                            <v-expand-transition>
                                <v-row v-show="showTitulos">
                                    <v-card-subtitle>{{ numTitulos }} título(s) individuais</v-card-subtitle>
                                    <v-card-text>
                                        <v-list>
                                            <v-list-item v-for="info in anosPorTitulo" :key="info.idTorneio">
                                                <v-list-item-icon>
                                                <v-icon>mdi-chart-donut</v-icon>
                                                </v-list-item-icon>
                                                <v-list-item-content>
                                                    <a @click="escolherAno(info.idTorneio, info.nomeTorneio)">{{ info.nomeTorneio }}</a>
                                                <h5 v-for="ano in info.anos" :key="ano">{{ ano }}</h5>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>
                                    </v-card-text>
                                    <line-chart :data="titulosPorAno"></line-chart>
                                </v-row>
                            </v-expand-transition>
                        </div>
                    </v-col>
                </v-row>
                <v-dialog v-model="dialog" persistent max-width="500">
                    <v-card>
                        <v-card-title class="primary white--text">{{ this.jogadoresDeEquipa.nomeEquipa }} - {{ this.jogadoresDeEquipa.ano }}</v-card-title>
                        <v-card-text>
                            <v-list-item-content v-for="jogador in jogadoresDeEquipa.descricao" :key="jogador.idJogador">
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
            <v-btn color="blue darken-1" text block @click="goBack()">voltar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'ConsultaJogador',
  data: () => ({
    jogador: {},
    idJogador: "",
    acumulaIds: [],
    equipas: [],
    jogadoresDeEquipa: {},
    titulosPorAno: {},
    anosPorTitulo: [],
    numTitulos: 0,
    loaded: false,
    dialog: false,
    showTorneios: false,
    showEquipas: false,
    showTitulos: false,
    setImagem: false,
    componentKey: 0,
    imagem: ""
  }),

  components: {
    CountryFlag
  },

  created: async function(){
      try{
            this.idJogador = this.$route.params.idJogador

            await this.initFunction(this.idJogador)
      }
      catch (e) {
          return e;
      }
  },

  watch: {
      $route: function(){
          this.idJogador = this.$route.params.idJogador
          this.showEquipas = false

          this.initFunction(this.idJogador)
      }
  },

  methods: {
    async initFunction(idJogador){
        try{
            this.showEquipas = false
            let response = await this.$http.get('http://127.0.0.1:4001/jogadores/' + idJogador)
            let imagens = response.data.imagens

            this.jogador = response.data

            if(String(imagens) == "Não definido"){
                this.imagem = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSsRXflGToQBiuslDfqpbRGQYbXOKS_ukUzAeoMImyCtGdpQ8Ra&usqp=CAU"
            }
            else{
                var imagensJogador = String(imagens).split('#_##_#')

                this.imagem = imagensJogador[Math.floor(Math.random() * imagensJogador.length)];

                this.setImagem = true
            }


            let equipasDoJogador = await this.$http.get('http://127.0.0.1:4001/jogadores/' + idJogador + '/equipas')

            this.equipas = equipasDoJogador.data

            await this.getTitlesInfo()
            
            this.loaded = true;
        }
        catch(error){
            console.log("Erro:", error)
        }
    },
    async getTitlesInfo(){
        let infoTitulos = await this.$http.get('http://127.0.0.1:4001/jogadores/' + this.idJogador + '/infoTitulos')

        this.titulosPorAno = {}
        this.numTitulos = 0

        this.numTitulos = infoTitulos.data.numTitulos

        for(let i = 0; i<infoTitulos.data.titulosPorAno.length; i++){
            this.titulosPorAno[infoTitulos.data.titulosPorAno[i].ano] = infoTitulos.data.titulosPorAno[i].numTitulos
        }

        let anosPorTitulo = await this.$http.get('http://127.0.0.1:4001/jogadores/' + this.idJogador + '/anosPorTitulo')

        this.anosPorTitulo = []
        for(var i in anosPorTitulo.data){
            this.anosPorTitulo.push({
                idTorneio: String(i).split('##')[0],
                nomeTorneio: String(i).split('##')[1],
                anos: anosPorTitulo.data[i],
            })
        }
    },
    goBack(){
        this.$router.go(-1)
    },
    async mostraJogadores(nomeEquipa, ano){
        this.dialog = true
        let jogadores = await this.$http.get('http://127.0.0.1:4001/equipas/' + ano + '?nomeEquipa=' + nomeEquipa)

        this.jogadoresDeEquipa = {
            nomeEquipa: nomeEquipa,
            ano: ano,
            descricao: jogadores.data['undefined']
        }
    },
    verJogador(idJogador){
        this.dialog = false
        this.showTorneios = false
        this.showEquipas = false

        if(idJogador != this.$route.params.idJogador){
            this.$router.push({ name: "paginaJogador", params: {idJogador: idJogador}})
        }
    },
    escolherAno(idTorneio, nomeTorneio){
        this.$router.push({path: "/torneios/escolherAno", query: {idTorneio: idTorneio, nomeTorneio: nomeTorneio}})
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