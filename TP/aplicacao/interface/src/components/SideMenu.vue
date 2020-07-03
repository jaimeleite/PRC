<template>
    <v-navigation-drawer
        v-model="drawer"
        :color="color"
        left
        dark
        app
      >
        <v-list
            dense
            nav
            class="py-0"
          >
          <v-list-item two-line :class="'px-5'">
            <v-btn icon small color="primary" href="/">
              <v-list-item-avatar>
                <img src="../assets/logo.png">
              </v-list-item-avatar>
            </v-btn>

            <v-list-item-content :class="'px-3'">
              <v-list-item-title>TenisApp</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item
            v-for="item in items"
            :key="item.title"
            @click="goTo(item.rota)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import { mdiTennis } from '@mdi/js';
import { mdiTrophyOutline } from '@mdi/js';
import { mdiChartBar } from '@mdi/js';
import { mdiFlag } from '@mdi/js';

  export default {
    name: 'Header',

  data () {
      return {
        drawer: true,
        items: [
          { title: 'Jogadores', icon: mdiTennis, rota: '/jogadores/lista' },
          { title: 'Equipas', icon: mdiFlag, rota: '/equipas/listagem' },
          { title: 'Torneios', icon: mdiTrophyOutline, rota: '/torneios/menuTorneios' },
          { title: 'Curiosidades', icon: mdiChartBar, rota: '/curiosidades/menuCuriosidades' },
        ],
        color: 'primary'
      }
    },
  methods: {
    goTo(rota) {
      this.$router.push({ path: rota})              
    }
  }
  }
</script>