<script setup lang="ts">
import NavBarAdmin from "~/components/navBars/navBarAdmin.vue";

const value = ref(20)
</script>

<template>
  <nav-bar-admin />

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <div class="text-h5 my-5">
          Statystyki biletów
        </div>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="value"
            :rotate="-90"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ value }}
        </v-progress-circular>

        <div class="text-h6 my-2">
          Poziom zajętości
        </div>
      </v-col>

      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="value"
            :rotate="-90"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ value }}
        </v-progress-circular>

        <div class="text-h6 my-2">
          Poziom zajętości
        </div>
      </v-col>

      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="value"
            :rotate="-90"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ value }}
        </v-progress-circular>

        <div class="text-h6 my-2">
          Poziom zajętości
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>