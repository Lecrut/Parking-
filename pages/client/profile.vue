<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import CarForm from '~/components/user/carForm.vue'

definePageMeta({
  middleware: ['user-page-guard'],
})

const authStore = useAuthStore()
const carStore = useCarStore()

const { user } = storeToRefs(authStore)

const isShowCarForm = ref(false)

function handleEditCarForm() {
  isShowCarForm.value = !isShowCarForm.value
}

onMounted(() => {
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
        <div class="text-h5 ma-3">
          Lista samochodów
        </div>

        <v-btn class="my-4" @click="isShowCarForm = true">
          Dodaj samochód
        </v-btn>

        <div>
          Miejsce na wyswietlenie samochodów
        </div>
      </v-col>
    </v-row>
  </v-sheet>

  <CarForm
    :is-show="isShowCarForm"
    @on-close="handleEditCarForm"
  />
</template>

<style scoped>

</style>
