<template>
  <v-container>
    <v-card class="ma-12">
        <v-card-title class="primary white--text">
            <span class="headline">Partida {{ idPartida }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-col>
                    <v-row>
                        <v-col cols="3">
                          <div class="primary--text subtitle-1">Duração(minutos)</div>
                        </v-col>
                        <v-col cols="7">
                          <div class="--text title">{{ partida.duracao }}</div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                          <div class="primary--text subtitle-1">Resultado</div>
                        </v-col>
                        <v-col cols="7">
                          <div class="--text title">{{ partida.resultado }}</div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                          <div class="primary--text subtitle-1">Vencedor</div>
                        </v-col>
                        <v-col cols="7">
                          <div class="--text title">
                            <b v-if="dcPartida = true">{{ partida.nomePaisVencedor }}</b>
                            <v-spacer v-if="dcPartida = true"></v-spacer>
                            <a @click="verJogador(partida.idVencedor)" v-if="partida.nomeVencedor != 'Não definido'">
                              {{ partida.nomeVencedor }}
                            </a>
                            <a @click="verJogador(partida.idVencedor)" v-else>
                              {{ partida.idVencedor }}
                            </a>
                          </div>                  
                      </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="3">
                          <div class="primary--text subtitle-1">Perdedor</div>
                        </v-col>
                        <v-col cols="7">
                          <div class="--text title">
                            <b v-if="dcPartida = true">{{ partida.nomePaisPerdedor }}</b>
                            <v-spacer v-if="dcPartida = true"></v-spacer>
                            <a @click="verJogador(partida.idPerdedor)" v-if="partida.nomePerdedor != 'Não definido'">
                              {{ partida.nomePerdedor }}
                            </a>
                            <a @click="verJogador(partida.idPerdedor)" v-else>
                              {{ partida.idPerdedor }}
                            </a>
                          </div>                  
                        </v-col>
                    </v-row>
                </v-col>
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
  name: 'ConsultaPartida',
  data: () => ({
      idPartida: '',
      partida: {},
      dcPartida: false
  }),

  created: async function(){
        this.idPartida = this.$route.params.idPartida
        let response

        if(String(this.idPartida).includes("DavisCup")){
          response = await this.$http.get('http://127.0.0.1:4001/partidas/' + this.idPartida + '?dcPartida=true')

          this.dcPartida = true
        }
        else{
          response = await this.$http.get('http://127.0.0.1:4001/partidas/' + this.idPartida)

          this.dcPartida = false
        }

        this.partida = response.data
  },

  methods: {
    verJogador(idJogador){
      this.$router.push({ path: "/jogadores/" + idJogador})
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