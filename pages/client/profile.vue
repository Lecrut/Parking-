<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import CarForm from '~/components/user/carForm.vue'

definePageMeta({
  middleware: ['user-page-guard'],
})

const authStore = useAuthStore()
const carStore = useCarStore()

const { user } = storeToRefs(authStore)
const { cars } = storeToRefs(carStore)

const isShowCarForm = ref(false)
const successSnackbar = ref(false)

function showSuccessSnackbar() {
  successSnackbar.value = true
}
function handleEditCarForm() {
  isShowCarForm.value = !isShowCarForm.value
}

onMounted(() => {
  if (user.value?._id)
    carStore.fetchCarsForUser(user.value._id)
})

watch(isShowCarForm, () => {
  if (user.value?._id)
    carStore.fetchCarsForUser(user.value._id)
})
</script>

<template>
  <NavBarUser />

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
            src="/profile.jpeg"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 py-3">
          <ProfileTab />
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
      <v-col cols="12" sm="12" md="6" class="pa-3">
        <div class="text-h5 ma-3 mt-6">
          Twoje samochody
        </div>

        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="300"
            aspect-ratio="4/3"
            cover
            src="/addCar.jpeg"
        />

        <v-btn class="my-4" @click="isShowCarForm = true">
          Dodaj samochód
        </v-btn>

        <div v-if="!cars.length" class="text-h5 my-5">
          Brak samochodów do wyświetlenia.
        </div>

        <div v-else v-for="(car, index) in cars" :item="car" :key="index">
          <v-card
              class="my-5"
              elevation="10"
          >
            <v-card-title>
              {{car.brand}} {{car.model}}
            </v-card-title>
            <v-card-text>
              {{car.registrationNum}}
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-sheet>

  <SnackbarSuccessSnackbar v-model="successSnackbar" text="Dodano nowy samochód" />

  <CarForm
    :is-show="isShowCarForm"
    @show-snackbar="showSuccessSnackbar"
    @on-close="handleEditCarForm"
  />
</template>
