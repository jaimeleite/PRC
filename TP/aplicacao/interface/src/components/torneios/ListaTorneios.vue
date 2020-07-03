<template>
    <v-card class="ma-2">
        <v-card-title class="primary white--text">
            Torneios do ano {{ ano }} da categoria {{ tipo }}
            <v-spacer></v-spacer>
            <v-text-field
                v-model="filtrar"
                label="Filtrar"
                single-line
                hide-details
                dark
            ></v-text-field>
        </v-card-title>
        <v-card-subtitle v-if="this.evalsuperficie" class="primary white--text"
        >
            Superfície {{ this.superficie }} 
        </v-card-subtitle>
        <v-card-text>
            <v-data-table
                :headers="htorneios"
                :items="torneios"
                :footer-props="footer_props"
                :items-per-page="5"
                :search="filtrar"
                style="max-height:500px; overflow-y: auto;">

                <template v-slot:no-data>
                    <v-alert :value="true" color="warning" icon="warning">
                        Ainda não foi possível apresentar uma lista dos torneios...
                    </v-alert>
                </template>
                
                <template v-slot:item.ops="{ item }">
                    <v-btn icon small color="primary" @click="mostraTorneio(item)">
                        <v-icon
                        >
                            {{ verTorneio }}
                        </v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
  import { mdiChevronRightCircleOutline } from '@mdi/js';
  export default {
    name: 'ListaTorneios',

    data: () => ({
        search: '',
        htorneios: [
            { text: "Id", sortable: true, value: 'id'},
            { text: "Nome", sortable: true, value: 'nome'},
            { text: "Dificuldade", sortable: false, value: 'dificuldade'},
            { text: "Ver detalhes", value: 'ops'}
        ],
        footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [5, 10, 20, 50, 100],
            "items-per-page-all-text": "Todos"
        },
        torneios: [],
        selectTipo: {tipo: ""},
        selectAno: {ano: ""},
        selectSuperficie: {superficie: ""},
        tipo: "",
        ano: "",
        superficie: "",
        filtrar: "",
        verTorneio: mdiChevronRightCircleOutline,
        evalsuperficie: false
    }),

    created: async function(){
        var torneio = this.$route.query.tipo
        var ano = this.$route.query.ano
        var superficie = this.$route.query.superficie

        this.tipo = torneio
        this.ano = ano
        if(superficie != "vazio"){
            this.superficie = superficie
            this.evalsuperficie = true
        }
        let response = await this.$http.get('http://127.0.0.1:4001/torneios?tipoTorneio=' + torneio + '&ano=' + ano + '&superficie=' + superficie)
    
        this.torneios = response.data

        this.torneios.sort(this.ordenaTorneios)
    },
    
    methods: {
        mostraTorneio(item){
            let idTorneio = item.id
            this.$router.push({ path: "" + idTorneio, query: {nomeTorneio: item.nome, ano: this.ano}})
        },
        ordenaTorneios(torneio1, torneio2){
            if (torneio1.nome > torneio2.nome) return 1;
            if (torneio2.nome > torneio1.nome) return -1;

            return 0;
        }
    }
  }
</script>
