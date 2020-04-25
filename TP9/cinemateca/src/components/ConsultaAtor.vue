<template>
    <div v-if="!this.loaded">
        Loading...
    </div>
    <v-card class="ma-4" v-else>
        <v-card-title class="indigo darken-4 white--text" dark>
            <span class="headline">Ator "{{ ator.nomeAtor }}" ({{ator.idAtor}})</span>
        </v-card-title>

        <v-card-text>
            <v-container>
            <v-row>
                <v-col cols="2">
                <div class="info-label">Id</div>
                </v-col>
                <v-col>
                <div class="info-content">{{ ator.idAtor }}</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                <div class="info-label">Nome</div>
                </v-col>
                <v-col>
                <div class="info-content">{{ ator.nomeAtor }}</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="2">
                <div class="info-label">Sexo</div>
                </v-col>
                <v-col>
                <div class="info-content">{{ ator.sexo }}</div>
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
  name: 'ConsultaAtor', 
  data: () => ({
    footer_props: {
      "items-per-page-text": "Mostrar",
      "items-per-page-options": [10, 20, 50, 100, -1],
      "items-per-page-all-text": "Todos"
    }, 
  idAtor: "",
  ator: {},
  loaded: false
  }),

  created: async function(){
    try {
      this.idAtor = this.$route.params.idAtor
      let response = await axios.get(lhost + "/atores/" + this.idAtor);
      this.ator = {
          idAtor: response.data[0].idAtor,
          nomeAtor: response.data[0].anome,
          sexo: response.data[0].sexo
      }

      this.loaded = true;
    } 
    catch (e) {
      return e;
    }
  },

  methods: {
    
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