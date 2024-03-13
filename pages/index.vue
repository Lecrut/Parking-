<template>
  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="266"
            aspect-ratio="4/3"
            cover
            src="../public/parkingOne.jpeg"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
          <div class="text-h5">
            Witamy na naszym parkingu
          </div>

          <p class="mt-2">
            Zaloguj się na swoje konto aby mieć dostęp do całej historii swojego parkowania.
            Uzyskasz także dostęp do kupienia dodatkowych pakietów.
          </p>
          <v-btn class="my-4">
            Logowanie
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
</script>