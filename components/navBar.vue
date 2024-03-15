<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-app-bar
      prominent
      class="px-2"
  >
    <v-btn variant="text" color="default" to="/">
      Parking+
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn variant="text" color="default" to="/auth/login">
      Logowanie
    </v-btn>

    <v-btn variant="text" color="default" to="/priceList">
      Cennik
    </v-btn>

    <v-btn variant="text" color="default" to="/noLoginParking">
      Szybkie parkowanie
    </v-btn>

    <v-btn variant="text" color="default" @click="toggleTheme" icon="mdi-theme-light-dark"></v-btn>

  </v-app-bar>
</template>

<style scoped>

</style>