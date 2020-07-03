<template>
  <v-container>
      <SideMenu/>
      <router-view></router-view>
  </v-container>
</template>

<script>
  import SideMenu from '../SideMenu.vue'

  export default {
    name: 'Equipas',
    data: function () {
        return {
        }
    },
    components: {
      SideMenu
    }
  }
</script>