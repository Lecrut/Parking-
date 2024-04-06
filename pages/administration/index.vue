<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'
import parkingPlace from '~/components/administration/parkingPlace.vue'

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
        <v-col v-for="parkingSpot in 60" :key="parkingSpot" cols="4">
          <parkingPlace
            :numb="parkingSpot"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>
