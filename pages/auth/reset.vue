<script setup lang="ts">
import NavBar from "~/components/navBar.vue";

</script>

<template>

  <nav-bar />

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
              src="/reset.jpeg"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 py-4" >
          <div class="text-h5 my-2">
            Rest hasła
          </div>

          <p>Jeżeli zapomniałeś hasła wpisz swój mail.</p>

          <form class="w-75 my-2">

            <v-text-field
                label="Adres Email"
                placeholder="example@mail.com"
                type="email"
            ></v-text-field>

            <v-btn>
              Zresetuj
            </v-btn>
          </form>

        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>