<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import ticket from '~/components/user/ticket.vue'

definePageMeta({
  middleware: ['user-page-guard'],
})

useHead({
  title: "Historia - Parking+"
})

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const ticketStore = useTicketStore()
const { validTickets, historyTickets } = storeToRefs(ticketStore)

const carStore = useCarStore()
const { cars } = storeToRefs(carStore)

onMounted(async () => {
  if (user.value?._id) {
    await ticketStore.fetchHistoryTicketsForUser(user.value._id)
    await ticketStore.fetchValidTicketsForUser(user.value._id)
    await carStore.fetchCarsForUser(user.value._id)
  }
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
    <v-row justify="center" class="text-h6 my-5">
      <v-col cols="12" md="8" sm="12">
        <v-row justify="center">
          <div v-if="!validTickets.length" class="text-h5 my-5">
            Aktualnie nie posiadasz żadnych biletów.
          </div>

          <div v-else>
            <div class="text-h5 my-5">
              Twoje aktualne bilety:
            </div>

            <v-row justify="center">
              <div
                v-for="(ticket, index) in validTickets"
                :key="index"
                :item="ticket"
              >
                <v-col md="12" sm="12">
                  <ticket
                      :ticket="ticket"
                      :car="cars.find(item => item._id === ticket.car) || null"
                  />
                </v-col>
              </div>
            </v-row>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
    elevation="4"
    max-width="1100"
    rounded
  >
    <v-row justify="center" class="text-h6 my-">
      <v-col cols="12" md="8" sm="12">
        <v-row justify="center">
          <v-col cols="12">
            <div class="text-h5 my-5">
              Historia
            </div>
          </v-col>

          <v-row v-if="historyTickets.length === 0" justify="center">
            <v-col cols="12">
              <div class="text-h6 mb-5">
                Brak biletów do wyświetlenia
              </div>
            </v-col>
          </v-row>

          <v-row v-else justify="center">
            <div v-for="(ticket, index) in historyTickets" :key="index" :item="ticket" >
              <v-col md="12" sm="12">
                <ticket
                    :ticket="ticket"
                    :is-expired="true"
                    :car="cars.find(item => item._id === ticket.car) || null"
                />
              </v-col>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
