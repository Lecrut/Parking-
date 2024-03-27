<script setup lang="ts">
import NavBar from '~/components/navBars/navBar.vue'

definePageMeta({
  middleware: ['guest-page-guard'],
})
</script>

<template>
  <NavBar />

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
            src="/noLogged.jpeg"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 py-3">
          <div class="text-h5 my-2">
            Parkowanie bez konta
          </div>

          <p class="my-2">
            Wypełnij formularz aby przejść do płatności i otrzymać bilet parkingowy.
          </p>

          <form class="w-75 my-2">
            <v-text-field
              label="Numer rejestracyjny"
            />

            <v-text-field
              label="Adres Email"
              placeholder="example@mail.com"
              type="email"
            />

            <v-checkbox
              label="Akceptuję regulamin"
            />

            <v-btn>
              Zatwierdź
            </v-btn>
          </form>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>
