<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
</script>

<template>
  <NavBarUser />
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1400" rounded
  >
    <div class="text-h5">
      Twoje aktualne bilety:
    </div>
  </v-sheet>

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1400" rounded
  >
    <div class="text-h5">
      Historia:
    </div>
  </v-sheet>
</template>

<style scoped>

</style>
