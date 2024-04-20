<script setup lang="ts">

definePageMeta({
  middleware: ['user-page-guard'],
})

useHead({
  title: 'Płatność - Parking+',
})

const route = useRoute()
const placeId = ref(String(route.params.placeId) || '')

const successSnackbar = ref(false)
function payForPlace() {
  successSnackbar.value = true
}

watch(successSnackbar, (newValue, oldValue) =>{
  if (newValue === false && oldValue === true)
    navigateTo("/client")
})
</script>

<template>
  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center" class="my-3">
      <v-col cols="12">
        <div class="text-h5 my-2 mb-5">
          Płatność
        </div>

        <p>
          Miejsce nr.
        </p>
      </v-col>
      <v-col cols="12">
        <v-btn class="my-2" @click="payForPlace">
          Zapłać
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>

  <SnackbarSuccessSnackbar v-model="successSnackbar" text="Pomyślnie opłacono bilet" />
</template>
