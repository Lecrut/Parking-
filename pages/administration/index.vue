<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'
import parkingPlace from '~/components/administration/parkingPlace.vue'
import ticket from '~/components/user/ticket.vue'
import type { IEvent } from '~/models/Event'

definePageMeta({
  middleware: ['admin-page-guard'],
})

const ticketStore = useTicketStore()
const { validTickets } = storeToRefs(ticketStore)

const placeTable = Array.from({ length: 50 }, (_, i) => ({
  placeNum: i,
  placeTicket: null as IEvent | null,
  isFree: true,
}))

function createPlaceTable() {
  for (let i = 0; i < placeTable.length; i++) {
    validTickets.value.forEach((bilet: IEvent) => {
      if (bilet.fieldNum === i) {
        placeTable[i].placeTicket = bilet
        placeTable[i].isFree = false
      }
    })
  }
}

onMounted(async () => {
  await ticketStore.fetchAllValidTickets().then(createPlaceTable)
})
</script>

<template>
  <NavBarAdmin />
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">
            PARKING ŁÓDŹ, UL. WÓLCZAŃSKA 223
          </h1>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col v-for="parkingSpot in 50" :key="parkingSpot" cols="2">
          <v-card>
            <v-card-title class="text-center">
              Miejsce {{ parkingSpot }}
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>

      <!-- <v-row>
        <v-col v-for="(ticket, index) in validTickets" :key="index" :item="ticket" cols="4">
          <ticket :ticket />
        </v-col>
      </v-row> -->

      <!-- <v-slide-group class="pa-4" selected-class="bg-primary" show-arrows>
        <v-slide-group-item v-for="n in 50" :key="n" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card
            v-if="placeTable[n].placeTicket === null" class="ma-4" :class="[selectedClass]" color="grey-lighten-1"
            height="200" width="100" @click="toggle"
          />

          <v-card>
            <div>
              {{ placeTable[n].isFree }}
            </div>
          </v-card>

          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48" />
            </v-scale-transition>
          </div>
        </v-slide-group-item>
      </v-slide-group> -->
    </v-container>
  </v-app>
</template>

<style scoped>

</style>
