<script setup lang="ts">

import {mapTicketTypeToPrice} from "~/composable/prices";
import {mapDate} from "../../../../composable/time";

definePageMeta({
  middleware: ['user-page-guard'],
})

useHead({
  title: 'Płatność - Parking+',
})

const route = useRoute()
const placeId = ref(String(route.params.placeId) || '')

const ticketStore = useTicketStore()
const { ticketToPay } = storeToRefs(ticketStore)

const successSnackbar = ref(false)
async function payForPlace() {
  if (ticketToPay.value)
    await ticketStore.endTicket(ticketToPay.value)
  successSnackbar.value = true
}

function countStandardTicketPrice() {
  if (ticketToPay.value) {
    const currentDate = new Date()
    const diffInMilliseconds = currentDate.getTime() - ticketToPay.value.enterHour.getTime()
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60)
    return (mapTicketTypeToPrice('Standard') * Math.ceil(diffInHours)).toString()
  }
}

onMounted( async () => {
  if (placeId.value !== '') {
    await ticketStore.fetchTicketByID(placeId.value)
  }
})

watch(successSnackbar, (newValue, oldValue) => {
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
          Miejsce nr. {{ ticketToPay ? Number(ticketToPay.fieldNum) + 1 : 0 }}
        </p>

        <p>
          Samochód stoi od {{ ticketToPay ? mapDate(ticketToPay.enterHour) : ''}}
        </p>

        <p>
          Kwota do zapłacenia {{ countStandardTicketPrice() }}zł
        </p>
      </v-col>
      <v-col cols="12">
        <v-btn class="ma-2" @click="payForPlace">
          Zapłać
        </v-btn>

        <v-btn class="ma-2" to="/client" color="error">
          Zamknij
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>

  <SnackbarSuccessSnackbar v-model="successSnackbar" text="Pomyślnie opłacono bilet" />
</template>
