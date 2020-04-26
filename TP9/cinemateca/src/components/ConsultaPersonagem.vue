<template>
    <div v-if="!this.loaded">
        Loading...
    </div>
    <v-card class="ma-4" v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">Personagem "{{ personagem.infoPersonagem.nomeP }}" ({{personagem.infoPersonagem.idP}})</span>
        </v-card-title>

        <v-card-text>
          <v-container>ersonagem
            <v-row>
                <v-col cols="2">
                <div class="info-label">Id</div>
                </v-col>
                <v-col>
                <div class="info-content">{{ personagem.infoPersonagem.idP }}</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                <div class="info-label">Nome</div>
                </v-col>
                <v-col>
                <div class="info-content">{{ personagem.infoPersonagem.nomeP }}</div>
                </v-col>
            </v-row>
            <v-row v-if="personagem.filmesPersonagem && personagem.filmesPersonagem.length > 0">
                <v-col cols="2">
                <div class="info-label">Filmes</div>
                </v-col>
                <v-col>
                    <div class="info-content">
                        <ul>
                            <li 
                                v-for="filme in personagem.filmesPersonagem"
                                :key="filme.idFilme"
                            >
                                <a @click="consultaFilme(filme)">{{ filme.tituloFilme }}</a>
                            </li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="personagem.atoresPersonagem && personagem.atoresPersonagem.length > 0">
                <v-col cols="2">
                <div class="info-label">Atores</div>
                </v-col>
                <v-col>
                    <div class="info-content">
                        <ul>
                            <li 
                                v-for="ator in personagem.atoresPersonagem"
                                :key="ator.idAtor"
                            >
                                <a @click="consultaAtor(ator)">{{ ator.nomeAtor }}</a>
                            </li>
                        </ul>
                    </div>
                </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="$router.go(-1)">voltar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>

import axios from 'axios'
const lhost = require("@/config/global").host;

export default {
  name: 'ConsultaPersonagem', 
  data: () => ({
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "Todos"
    }, 
  idPersonagem: "",
  personagem: {},
  loaded: false
  }),

  created: async function(){
    try {
      this.idPersonagem = this.$route.params.idPersonagem
      let response = await axios.get(lhost + "/personagens/" + this.idPersonagem);
      this.personagem = response.data

      this.loaded = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    consultaFilme(filme){
      this.$router.push("/filmes/" + filme.idFilme);
    },
    consultaAtor(ator){
      this.$router.push({ path: "/atores/" + ator.idAtor});
    }
  }
}

</script>

<style>
.info-label {
  color: indigo;
  padding: 5px;
  font-weight: 400;
  width: 100%;
  background-color: #e0f2f1;
  font-weight: bold;
}

.info-content {
  padding: 5px;
  width: 100%;
  border: 1px solid #1a237e;
}
</style>