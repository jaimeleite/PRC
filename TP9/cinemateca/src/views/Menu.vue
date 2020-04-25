<template>
    <v-container>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="goTo(item.rota)"
        >
            <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Menu',
  data () {
      return {
        items: [
            { title: 'Filmes', rota: '/principal' },
            { title: 'Atores', rota: '/atores' },
            { title: 'Personagens', rota: '/personagens' },
        ]
    }
  },
  methods: {
    goTo(rota) {
      this.$router.push({ path: rota})              
    }
  }
}
</script>
