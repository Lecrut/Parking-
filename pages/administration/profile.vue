<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'

definePageMeta({
  middleware: ['admin-page-guard'],
})

useHead({
  title: "Profil - Parking+"
})
</script>

<template>
  <NavBarAdmin />

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
    elevation="4"
    max-width="1100"
    rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 pa-6">
          <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="300"
            aspect-ratio="4/3"
            cover
            src="/profileAdmin.jpeg"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 py-3">
          <ProfileTab />
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>
