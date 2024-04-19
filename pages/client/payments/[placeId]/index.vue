<script setup lang="ts">

definePageMeta({
  middleware: ['user-page-guard'],
})

useHead({
  title: 'Płatność - Parking+',
})

const route = useRoute()

const placeId = ref(route.params.placeId || '')
</script>

<template>
  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    Płatność {{placeId}}
  </v-sheet>
</template>
