<script setup lang="ts">
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
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
        <v-col cols="12" sm="12" md="6">
          <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="250"
            aspect-ratio="4/3"
            cover
            src="/ticketOne.jpg"
          />
        </v-col>
        <v-col cols="12" sm="12" md="6">
          <div class="d-flex flex-column align-center justify-center h-100 mx-2">
            <div class="text-h5 mb-2">
              Bilet jednorazowy
            </div>

            <p class="mb-1 mt-1">
              Płać stałą sumę za każdą rozpoczętą godzinę. Wymaga logowania.
            </p>

            <p class="text-h6 mt-2 mb-2 font-weight-bold">
              5 zł za godzinę
            </p>

            <v-btn class="my-4" to="/noLoginParking">
              Zakup bilet
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
          <div class="d-flex flex-column align-center justify-center h-100 mx-2">
            <div class="text-h5 mb-2">
              Bilet dzienny
            </div>

            <p class="mb-1 mt-1">
              Bilet obowiązujący 24 godziny od momentu zakupu. Nie wymaga logowania.
            </p>

            <p class="text-h6 mt-2 mb-2 font-weight-bold">
              20 zł
            </p>

            <v-btn class="my-4" :to=" user ? '/client/' : '/auth/login'">
              Zakup bilet
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="6">
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
      max-width="1100"
      rounded
    >
      <v-row justify="center">
        <v-col cols="12" sm="12" md="6">
          <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="250"
            aspect-ratio="4/3"
            cover
            src="/ticketThree.jpg"
          />
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <div class="d-flex flex-column align-center justify-center h-100 mx-2">
            <div class="text-h5 mb-2">
              Bilet tygodniowy
            </div>

            <p class="mb-1 mt-1">
              Bilet obowiązujący na 7 dni. Wymaga logowania.
            </p>

            <p class="text-h6 mt-2 mb-2 font-weight-bold">
              100 zł
            </p>

            <v-btn class="my-4" :to=" user ? '/client/' : '/auth/login'">
              Zakup bilet
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
          <div class="d-flex flex-column align-center justify-center h-100 mx-2">
            <div class="text-h5 mb-2">
              Bilet miesięczny
            </div>

            <p class="mb-1 mt-1">
              Bilet obowiązujący na 30 dni.  Wymaga logowania.
            </p>

            <p class="text-h6 mt-2 mb-2 font-weight-bold">
              250 zł
            </p>

            <v-btn class="my-4" :to=" user ? '/client/' : '/auth/login'">
              Zakup bilet
            </v-btn>
          </div>
        </v-col>

        <v-col cols="12" sm="12" md="6">
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
