<script setup lang="ts">
import {mapDate} from "~/composable/time";

useHead({
  title: 'Bilet - Parking+',
})

const route = useRoute()
const placeId = ref(String(route.params.placeId) || '')

const ticketStore = useTicketStore()
const { ticketToPay } = storeToRefs(ticketStore)

const carStore = useCarStore()
const { searchedCars } = storeToRefs(carStore)


onMounted( async () => {
  if (placeId.value !== '') {
    await ticketStore.fetchTicketByID(placeId.value)
    if (ticketToPay.value)
      await carStore.fetchCarByID(ticketToPay.value.car)
    else
      navigateTo("/client")
  }
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
          Bilet {{ ticketToPay ? ticketToPay.type : '' }}
        </div>

        <p>
          Miejsce nr. {{ ticketToPay ? Number(ticketToPay.fieldNum) + 1 : 0 }}
        </p>

        <p>
          Samochód {{ searchedCars ? searchedCars.brand + ' ' + searchedCars.model : '' }}
        </p>

        <p>
          Numer rejestracyjny {{ searchedCars ? searchedCars.registrationNum : '' }}
        </p>

        <p>
          Samochód stoi od {{ ticketToPay ? mapDate(ticketToPay.enterHour) : ''}}
        </p>

        <p>
          Ważny do {{ ticketToPay ? ticketToPay.exitHour ? mapDate(ticketToPay.exitHour) : '' : '' }}
        </p>

        <p>
          Cena {{ ticketToPay ? ticketToPay.price : '' }}zł
        </p>
      </v-col>
      <v-col cols="12">
        <v-btn class="ma-2" to="/" color="error">
          Zamknij
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>
