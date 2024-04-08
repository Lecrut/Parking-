<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'
import type { IEvent } from '~/models/Event'
import ticketView from '~/components/administration/ticketView.vue'

definePageMeta({
  middleware: ['admin-page-guard'],
})


const fullTicketShow = ref(false)
const actualTicket = ref<IEvent>()
const actualIndex = ref<number>()

useHead({
  title: "Administracja - Parking+"
})

const ticketStore = useTicketStore()
const { validTickets } = storeToRefs(ticketStore)

const placeTable = ref(Array.from({ length: 50 }, (_, i) => ({
  placeTicket: null as IEvent | null,
})))

function createPlaceTable() {
  placeTable.value.forEach((element, index) => {
    element.placeTicket = validTickets.value.find(item => item.fieldNum === index) || null
  })
}

function showTicketPlace(index: number) {
  fullTicketShow.value = true
  actualIndex.value = index
  actualTicket.value = validTickets.value.find(item => item.fieldNum === index)
}

function hideTicketPlace() {
  fullTicketShow.value = !fullTicketShow.value
}

onMounted(async () => {
  await ticketStore.fetchAllValidTickets().then(createPlaceTable)
})
</script>

<template>
  <NavBarAdmin />
  <v-app>
    <v-container>
      <v-sheet
        class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
        max-width="1100" rounded
      >
        <v-row class="my-4">
          <v-col cols="12">
            <h1 class="text-center">
              PARKING ŁÓDŹ, UL. WÓLCZAŃSKA 223
            </h1>
          </v-col>
        </v-row>

        <v-row justify="center" class="mb-4">
          <v-col
            v-for="(parkingSpot, index) in placeTable" :key="index" :item="parkingSpot" cols="12" md="4" sm="6"
            xs="12" lg="2"
          >
            <v-card :color="parkingSpot.placeTicket ? 'error' : 'success' " @click="showTicketPlace(index)">
              <v-card-title class="text-center">
                Miejsce {{ index }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </v-app>
  <ticketView :is-show="fullTicketShow" :ticket="actualTicket" @on-close="hideTicketPlace" />
</template>
