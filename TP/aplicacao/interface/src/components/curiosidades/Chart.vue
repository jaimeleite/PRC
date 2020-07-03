<template>
    <v-container fluid>
        <GChart
          :settings="{packages: ['bar']}"    
          :data="jogadoresInfo"
          :options="opcoesGrafico"
          :createChart="(el, google) => new google.charts.Bar(el)"
          @ready="aDesenhar"
          v-if="showBar"
        />
        <v-card style="height: 450px; box-shadow: none;">
          <v-card-subtitle v-if="showGeo"> {{ nomeCuriosidade }}</v-card-subtitle>  
          <geo-chart style="height:100%" :data="paises" v-if="showGeo"></geo-chart>
        </v-card>
    </v-container>
</template>

<script>
import { GChart } from 'vue-google-charts'

  export default {
    name: 'Chart',

    components: {
        GChart
    },

    props: ['nomeCuriosidade'],

    data: () => ({
        controloGrafico: null, 
        jogadoresInfo: [[''], [' ']],
        equipas: {
          'Espanha': 'Spain', 'Argentina': 'Argentina', 'Austrália': 'Australia', 'Canadá': 'Canada', 'Alemanha': 'Germany', 'Sérvia': 'Serbia', 'Rússia': 'Russia', 'Reino Unido': 'United Kingdom', 'Itália': 'Italy', 'França': 'France',
          'Países Baixos': 'Netherlands', 'Hungria': 'Hungary', 'Bélgica': 'Belgium', 'Japão': 'Japan', 'Suíça': 'Switzerland', 'Cazaquistão': 'Kazakhstan', 'Estados Unidos da América': 'United States', 'Croácia': 'Croatia', 'Czechia': 'Czech Republic','Polônia': 'Poland',
          'Brasil': 'Brazil', 'Israel': 'Israel', 'Áustria': 'Austria', 'Suécia': 'Sweden', 'Romênia': 'Romania', 'Chile': 'Chile', 'Índia': 'India', 'Equador': 'Ecuador', 'Coreia (República da)': 'South Korea', 'Peru': 'Peru',
          'Bielorrússia': 'Belarus', 'Eslováquia': 'Slovakia', 'Marrocos': 'Morocco', 'Zimbábue': 'Zimbabwe', 'África do Sul': 'South Africa', 'México': 'Mexico', 'Dinamarca': 'Denmark', 'Cuba': 'Cuba', 'Jugoslávia': 'Yugoslavia', 'Nova Zelândia': 'New Zealand',
          'Indonésia': 'Indonesia', 'Paraguai': 'Paraguay', 'Filipinas': 'Philippines', 'Paquistão': 'Pakistan', 'Sri Lanka': 'Sri Lanka', 'Tailândia': 'Thailand', 'Taipé Chinesa, República da China': 'Taiwan', 'Irlanda': 'Ireland', 'Venezuela': 'Venezuela', 'Vietname': 'Vietnam'
        },
        paises: [],
        showBar: false, showGeo: false
    }),
    async created(){
        if((this.nomeCuriosidade == 'Top 10 jogadores com mais vitórias') || (this.nomeCuriosidade == 'Top 10 jogadores com mais derrotas') || (this.nomeCuriosidade == 'Top 10 mais minutos jogados') || (this.nomeCuriosidade == 'Top 10 mais jogos') || (this.nomeCuriosidade == 'Top 10 jogadores mais titulados')){
          this.showBar = true
        }
        else if((this.nomeCuriosidade == 'Top 10 mais presenças') || (this.nomeCuriosidade == 'Top 10 equipas mais tituladas')){
          this.showGeo = true
        }
        await this.getInfo()
    },
    watch: {
      nomeCuriosidade: async function() {
        if((this.nomeCuriosidade == 'Top 10 jogadores com mais vitórias') || (this.nomeCuriosidade == 'Top 10 jogadores com mais derrotas') || (this.nomeCuriosidade == 'Top 10 mais minutos jogados') || (this.nomeCuriosidade == 'Top 10 mais jogos') || (this.nomeCuriosidade == 'Top 10 jogadores mais titulados')){
          this.showBar = false
          this.showGeo = false
          this.showBar = true
        }
        else if((this.nomeCuriosidade == 'Top 10 mais presenças') || (this.nomeCuriosidade == 'Top 10 equipas mais tituladas')){
          this.showBar = false
          this.showGeo = false
          this.showGeo = true
        }
        await this.getInfo()
      }
    },
    computed: {
      opcoesGrafico () {
        if (!this.controloGrafico) return null
        return this.controloGrafico.charts.Bar.convertOptions({
          chart: {
            title: this.nomeCuriosidade,
          },
          bars: 'horizontal',
          hAxis: { format: 'decimal' },
          height: 450,
          colors: ['#1b9e77', '#EEFF41', '#FF9800', '#d95f02']
        })
      }
    },
    methods: {
      aDesenhar (chart, google) {
        this.controloGrafico = google
      },
      async getInfo(){
        let response = await this.$http.get('http://127.0.0.1:4001/curiosidades/' + this.nomeCuriosidade)

        if(this.showBar){
          this.jogadoresInfo = [[' '], [' ']]

          for(let i = 0; i<response.data.length; i++){
              this.jogadoresInfo[0].push(response.data[i].jogadorInfo)
              if(this.nomeCuriosidade == 'Top 10 jogadores com mais vitórias'){
                  this.jogadoresInfo[1].push(parseInt(String(response.data[i].vitorias)))
              }
              else if(this.nomeCuriosidade == 'Top 10 jogadores com mais derrotas'){
                  this.jogadoresInfo[1].push(parseInt(String(response.data[i].derrotas)))
              }
              else if(this.nomeCuriosidade == 'Top 10 mais minutos jogados'){
                  this.jogadoresInfo[1].push(parseInt(String(response.data[i].tempoJogado)))
              }
              else if(this.nomeCuriosidade == 'Top 10 mais jogos'){
                  this.jogadoresInfo[1].push(parseInt(String(response.data[i].numPartidas)))
              }
              else if(this.nomeCuriosidade == 'Top 10 jogadores mais titulados'){
                  this.jogadoresInfo[1].push(parseInt(String(response.data[i].numTitulos)))
              }
          }
        }
        else if(this.showGeo){
          this.paises = []
          if(this.nomeCuriosidade == 'Top 10 mais presenças'){
            for(let i=0; i<response.data.length; i++){
              this.paises.push([
                this.equipas[response.data[i].nomeEquipa],
                response.data[i].numeroParticipacoes
              ])
            }
          }
          else if(this.nomeCuriosidade == 'Top 10 equipas mais tituladas'){
            for(let i=0; i<response.data.length; i++){
              this.paises.push([
                this.equipas[response.data[i].nomeEquipa],
                response.data[i].vitorias
              ])
            }
          }
        }
      }
    }
  }
</script>