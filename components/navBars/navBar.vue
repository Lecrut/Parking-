<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
function toggleTheme() {
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

    <v-spacer />

    <div class="hidden-sm-and-down">
      <v-btn variant="text" color="default" to="/auth/login">
        Logowanie
      </v-btn>

      <v-btn variant="text" color="default" to="/priceList">
        Cennik
      </v-btn>

      <v-btn variant="text" color="default" to="/noLoginParking">
        Szybkie parkowanie
      </v-btn>

      <v-btn variant="text" color="default" icon="mdi-theme-light-dark" @click="toggleTheme" />
    </div>

    <div class="hidden-md-and-up">
      <v-btn class="rounded-xl mr-2" color="default">
        <v-icon icon="mdi-menu" />
        <v-menu activator="parent">
          <v-list class="justify-center">
            <v-list-item to="/auth/login">
              <v-list-item-title>Logowanie</v-list-item-title>
            </v-list-item>

            <v-list-item to="/priceList">
              <v-list-item-title>Cennik</v-list-item-title>
            </v-list-item>

            <v-list-item to="/noLoginParking">
              <v-list-item-title>Szybkie parkowanie</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style scoped>

</style>
