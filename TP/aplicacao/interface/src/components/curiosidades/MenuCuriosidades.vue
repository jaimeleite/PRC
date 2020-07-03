<template>
    <v-container fluid>
        <v-card-title>Menu curiosidades</v-card-title>
        <v-card-subtitle>Consulte curiosidades entre jogadores e torneios</v-card-subtitle>
        <v-col cols="6">
          <v-select
            v-model="select"
            :items="curiosidades"
            label="Escolha a curiosidade"
            menu-props="auto"
            persistent-hint
            single-line
          ></v-select>
        </v-col>
        <v-divider></v-divider>
        <Chart v-if="this.showCuriosity" :nomeCuriosidade="select"/>
    </v-container>
</template>

<script>
import Chart from './Chart.vue'

  export default {
    name: 'MenuCuriosidades',

    components: {
        Chart,
    },

    data: () => ({
      showCuriosity: false,
      showCuriosityGeo: false,
      select: "",
      curiosidades: [
        'Top 10 jogadores com mais vitórias', 'Top 10 jogadores com mais derrotas', 'Top 10 mais minutos jogados', 'Top 10 mais jogos', 'Top 10 mais presenças', 'Top 10 equipas mais tituladas', 'Top 10 jogadores mais titulados'
      ],
    }),
    watch: {
      select: function() {
        this.setActivate()
      }
    },
    methods: {
      setActivate(){
        this.showCuriosity = false
        this.showCuriosity = true
      }
    }
  }
</script>