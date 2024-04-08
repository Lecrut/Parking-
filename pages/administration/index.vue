<script setup lang="ts">
import NavBarAdmin from '~/components/navBars/navBarAdmin.vue'
import parkingPlace from '~/components/administration/parkingPlace.vue'
import ticket from '~/components/user/ticket.vue'

definePageMeta({
  middleware: ['admin-page-guard'],
})

const ticketStore = useTicketStore()
const { validTickets } = storeToRefs(ticketStore)

onMounted(() => {
  ticketStore.fetchAllValidTickets()
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

      <v-slide-group class="pa-4" selected-class="bg-primary" show-arrows>
        <v-slide-group-item v-for="n in 60" :key="n" v-slot="{ isSelected, toggle, selectedClass }">
          <v-card class="ma-4" :class="[selectedClass]" color="grey-lighten-1" height="200" width="100" @click="toggle">
            <div class="d-flex fill-height align-center justify-center">
              <v-scale-transition>
                <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48" />
              </v-scale-transition>
            </div>
          </v-card>
        </v-slide-group-item>
      </v-slide-group>
    </v-container>
  </v-app>
</template>

<style scoped>

</style>
