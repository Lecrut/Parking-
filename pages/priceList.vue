<script setup lang="ts">

</script>

<template>
  <v-container fluid>
    <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="4">
        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="266"
            aspect-ratio="4/3"
            cover
            src="/ticketOne.jpg"
        />
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
          <div class="text-h3">
            BILETY JEDNORAZOWE
          </div>

          <p class="mb-5 mt-2" >
            Płać stałą sumę za każdą rozpoczętą godzinę.
          </p>

          <p class="text-h3 mt-5">
            5 PLN / godzina
          </p>

        </div>
      </v-col>
    </v-row>
  </v-sheet>
  </v-container>
</template>

<style scoped>

</style>