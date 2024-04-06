<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'

definePageMeta({
  middleware: ['admin-page-guard'],
})
</script>

<template>
  <NavBarAdmin />
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">
            PARKING ŁÓDŹ, UL. WÓLCZAŃSKA 223
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="parkingSpot in 60" :key="parkingSpot" cols="3">
          <v-card>
            <v-card-title class="text-center">
              Miejsce {{ parkingSpot }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>
