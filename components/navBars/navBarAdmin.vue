<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
const auth = useAuthStore()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function logOut() {
  auth.logout()
  navigateTo('/')
}
</script>

<template>
  <v-app-bar
      prominent
      class="px-2"
  >
    <v-btn variant="text" color="default" to="/administration">
      Parking+
    </v-btn>

    <v-spacer />

    <div class="hidden-sm-and-down">
      <v-btn variant="text" color="default" to="/administration/profile">
        Profil
      </v-btn>

      <v-btn variant="text" color="default" to="/administration/statistics">
        Statystyki
      </v-btn>

      <v-btn variant="text" color="default" to="/administration/history">
        Historia
      </v-btn>

      <v-btn variant="text" color="default" @click="logOut">
        Wyloguj
      </v-btn>

      <v-btn variant="text" color="default" icon="mdi-theme-light-dark" @click="toggleTheme" />
    </div>

    <div class="hidden-md-and-up">
      <v-btn class="rounded-xl mr-2" color="default">
        <v-icon icon="mdi-menu" />
        <v-menu activator="parent">
          <v-list class="justify-center">
            <v-list-item to="/administration/profile">
              <v-list-item-title>
                Profil
              </v-list-item-title>
            </v-list-item>
            <v-list-item to="/administration/statistics">
              <v-list-item-title>
                Statystyki
              </v-list-item-title>
            </v-list-item>
            <v-list-item to="/administration/history">
              <v-list-item-title>
                Historia
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logOut">
              <v-list-item-title>
                Wyloguj
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
    </div>
  </v-app-bar>
</template>
