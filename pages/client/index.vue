<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'

const auth = useAuthStore()

// const cars = [
//   {
//     value: 'bmw',
//     registration: 'EZG 12345',
//   },
//   {
//     value: 'mercedes',
//     registration: 'GDA 33333',
//   },
// ]
</script>

<template>
  <NavBarUser />
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1100" rounded
  >
    <v-row justify="center">
      <v-col>
        <div class="text-h2 ma-3">
          Witaj, {{ auth.user?.name }}!
        </div>

        <v-row>
          <v-col>
            <p class="text-h5">
              Zakup bilet jednorazowy
            </p>
            <v-btn class="my-4">
              Kup bilet
            </v-btn>
          </v-col>

          <v-col>
            <p class="text-h5">
              Zakup bilet miesięczny
            </p>

            <v-btn class="my-4">
              Zakup bilet
            </v-btn>
          </v-col>

          <v-col>
            <p class="text-h5">
              Twoje bilety
            </p>
            <v-btn class="my-4">
              Zakup bilet
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>
