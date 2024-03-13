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
            src="/parkingFour.jpeg"
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

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 my-2" >
          <div class="text-h5">
            Jednorazowe parkowanie
          </div>

          <p class="mt-2">
            Nie musisz zakładać konta aby skorzystać z parkingu. Wpisz numer rejestracyjny swojego samochodu i gotowe.
          </p>
          <v-btn class="my-4" to="/noLoginParking">
            Parkuj
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="266"
            aspect-ratio="4/3"
            cover
            src="/parkingTwo.jpeg"
        />
      </v-col>
    </v-row>
  </v-sheet>

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
            src="/parkingThree.jpeg"
        />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2" >
          <div class="text-h5">
            Cennik
          </div>

          <p class="mt-2">
            Do wyboru są różne taryfy i rozwiązania. Możesz sprawdzić jakie są ceny przed parkowaniem.
          </p>
          <v-btn class="my-4">
            Cennik
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>
<script setup lang="ts">
</script>