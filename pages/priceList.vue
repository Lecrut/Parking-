<script setup lang="ts">


</script>

<template>
  <v-container fluid>
    <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="900"
      rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="4">
        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="250"
            aspect-ratio="4/3"
            cover
            src="/ticketOne.jpg"
        />
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
          <div class="text-h3 mb-2">
            BILET JEDNORAZOWY
          </div>

          <p class="mb-2">
            Płać stałą sumę za każdą rozpoczętą godzinę.
          </p>

          <p class="text-h3 mb-5">
            5 PLN / godzina
          </p>

        </div>
      </v-col>
    </v-row>
    
  </v-sheet>

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="900"
      rounded
  >
    <v-row justify="center">
      
      <v-col cols="12" sm="12" md="8">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
          <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
            <div class="text-h3 mb-2">
              BILET DZIENNY
            </div>

            <p class="mb-2">
              Bilet obowiązujący cały dzień od 00:00 do 23:59
            </p>

            <p class="text-h3 mb-5">
              20 PLN
            </p>

          </div>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="250"
            aspect-ratio="4/3"
            cover
            src="/ticketTwo.jpg"
        />
      </v-col>
    </v-row>
    
  </v-sheet>

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="900"
      rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="4">
        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="250"
            aspect-ratio="4/3"
            cover
            src="/ticketThree.jpg"
        />
      </v-col>

      <v-col cols="12" sm="12" md="8">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
          <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
            <div class="text-h3 mb-2">
              BILET TYGODNIOWY
            </div>

            <p class="mb-2">
              Bilet obowiązujący na 7 dni
            </p>

            <p class="text-h3 mb-5">
              100 PLN
            </p>

          </div>
        </div>
      </v-col>
      
    </v-row>
    
  </v-sheet>

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="900"
      rounded
  >
    <v-row justify="center">

      <v-col cols="12" sm="12" md="8">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
          <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
            <div class="text-h3 mb-2">
              BILET MIESIĘCZNY
            </div>

            <p class="mb-2">
              Bilet obowiązujący na 30 dni
            </p>

            <p class="text-h3 mb-5">
              250 PLN
            </p>

          </div>
        </div>
      </v-col>

      <v-col cols="12" sm="12" md="4">
        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="250"
            aspect-ratio="4/3"
            cover
            src="/ticketFour.jpg"
        />
      </v-col>
      
    </v-row>
    
  </v-sheet>

  </v-container>
</template>

<style scoped>

</style>