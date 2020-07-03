<template>
    <v-container fluid>
        <v-card-title>Torneios</v-card-title>
        <v-card-subtitle>Aqui pode selecionar o tipo de torneios que pretende ver, num dado ano</v-card-subtitle>
        <v-alert v-model="alert" dismissible type="error">
          Por favor, selecione os dois campos obrigatórios
        </v-alert>
        <v-row align="center">
            <v-col class="d-flex" cols="12" sm="6">
            <v-select
                v-model="selectTipo"
                :items="tipos"
                item-text="tipo"
                label="Escolha o tipo de torneio(obrigatório)"
                persistent-hint
                return-object
                single-line
            ></v-select>
            </v-col>
        </v-row>
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
            <v-select
                v-model="selectSuperficie"
                :items="superficies"
                item-text="superficie"
                label="Escolha a superfície(opcional)"
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
                Ver torneios
            </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
  export default {
    name: 'MenuTorneios',

    data: () => ({
        selectTipo: {tipo: ""},
        selectAno: {ano: ""},
        selectSuperficie: {superficie: ""},
        tipos: [],
        anos: [
        ],
        superficies: [],
        alert: false
    }),

    created: async function(){
        try {
            //obter os tipos, as superfícies e os anos
            let response = await this.$http.get('http://127.0.0.1:4001/torneios/infoGeral')           
            let infoGeral = response.data

            this.tipos = infoGeral.tipos
            this.superficies = infoGeral.superficies
            this.anos = infoGeral.anos            
        } 
        catch (e) {
            return e;
        }
    },
    
    methods: {
        verificaOpcoes() {
            try {
                if((this.selectTipo.tipo == "") || (this.selectAno.ano == "")){
                    this.alert = true
                }

                else{
                    let tip = ""
                    let supp = (String(this.selectSuperficie.superficie).length == 0) ? "vazio" : this.selectSuperficie.superficie

                    if(String(this.selectTipo.tipo) == "World_Tour(Masters + Small)"){
                        tip = "World_Tour"
                    }
                    else{
                        tip = this.selectTipo.tipo
                    }
                    this.$router.push({ path: "listaTorneios", query: {tipo: tip, ano: this.selectAno.ano, superficie: supp}})
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