<template>
    <v-img
      dark
      src="../assets/initial_page.jpg"
      height="100%"
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="display-4 font-weight-large mb-4 white--text">Tenis App</h1>
            <div class="mt-3">
                <v-btn :to="{ name: 'menuTorneios'}" class="white--text text-capitalize" color="green">Bem-vindo</v-btn>
            </div>
        </v-col>
      </v-row>
    </v-img>
</template>

<script>
  export default {
    name: 'Home',
    data: function () {
        return {
        }
    }
  }
</script>

<style>
html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>