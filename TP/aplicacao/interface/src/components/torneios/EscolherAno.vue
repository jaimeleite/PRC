<template>
    <v-container fluid>
        <v-card-title v-if="this.nomeTorneio != ''">Torneio {{ this.nomeTorneio }}({{ this.idTorneio }})</v-card-title>
        <v-card-title v-else>Torneio {{ this.idTorneio }}(nome não disponível)</v-card-title>
        <v-card-subtitle>Selecione um ano para poder ver as partidas realizadas</v-card-subtitle>
        <v-alert v-model="alert" dismissible type="error">
          Por favor, selecione o ano
        </v-alert>
        <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
            <v-select
                v-model="selectAno"
                :items="anos"
                item-text="ano"
                label="Escolha o ano(obrigatório)"
                persistent-hint
                return-object
                single-line
            ></v-select>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
            <v-btn
                class="white--text text-capitalize" 
                color="primary"
                @click="verificaOpcoes"
            >
                Ver torneio
            </v-btn>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
            <v-btn color="blue darken-1" text block @click="goBack()">voltar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'MenuTorneios',

    data: () => ({
        idTorneio: '',
        nomeTorneio: '',
        selectAno: {ano: ""},
        anos: [],
        alert: false
    }),

    created: async function(){
        this.idTorneio = this.$route.query.idTorneio
        let nomeT = this.$route.query.nomeTorneio
        let response = await this.$http.get('http://127.0.0.1:4001/torneios?idTorneio=' + this.idTorneio)

        this.anos = response.data

        if(nomeT != "Não definido") this.nomeTorneio = nomeT
    },

    methods: {
        goBack(){
            this.$router.go(-1)
        },
        verificaOpcoes() {
            try {
                if(this.selectAno.ano == ""){
                    this.alert = true
                }

                else{
                        this.$router.push({ path: "" + this.idTorneio, query: {nomeTorneio: this.nomeTorneio, ano: this.selectAno.ano}})
                        this.alert = false
                    } 
            }
            catch (e) {
                return e;
            }
        }
    }
  }
</script>