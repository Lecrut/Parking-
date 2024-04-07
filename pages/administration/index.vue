<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'
import parkingPlace from '~/components/administration/parkingPlace.vue'
import ticket from '~/components/user/ticket.vue'

definePageMeta({
  middleware: ['admin-page-guard'],
})

const ticketStore = useTicketStore()
const { validTickets } = storeToRefs(ticketStore)

onMounted(async () => {
  await ticketStore.fetchAllValidTickets()
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

      <v-row>
        <v-col v-for="(ticket, index) in validTickets" :key="index" :item="ticket" cols="4">
          <ticket :ticket />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>
