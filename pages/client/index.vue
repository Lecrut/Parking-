<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import periodicTicketForm from '~/components/user/periodicTicketForm.vue'
import ticket from '~/components/user/ticket.vue'
import singleTicketForm from "~/components/user/singleTicketForm.vue";

const periodicTicketFlag = ref(false)
const singleTicketFlag = ref(false)
const ticketsToShow = ref(true)

function changePeriodicTicketFlag() {
  periodicTicketFlag.value = !periodicTicketFlag.value
}

function changeSingleTicketFlag() {
  singleTicketFlag.value = !singleTicketFlag.value
}

const tickets = [
  {
    registrationNum: 'EZG 12345',
    car: 'Honda Civic',
    type: 'Miesięczny',
    fieldNo: 10,
    enterHour: '22-03-2024 10:00:00',
    exitHour: '22-04-2024 10:00:00',
    price: 200,
  },
  {
    registrationNum: 'EBR 23123',
    car: 'Fiat Seicento',
    type: 'Tygodniowy',
    fieldNo: 12,
    enterHour: '22-03-2024 12:00:00',
    exitHour: '29-03-2024 12:00:00',
    price: 100,
  },
]

definePageMeta({
  middleware: ['user-page-guard'],
})

const auth = useAuthStore()
</script>

<template>
  <NavBarUser />
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
    elevation="4"
    max-width="1100"
    rounded
  >
    <v-row justify="center" class="text-h6 mt-5 mb-5">
      <v-col cols="12" md="8" sm="12">

        <div class="text-h5 mt-5 mb-5">
          Witaj, {{ auth.user?.name }}!
        </div>

        <v-row justify="center">
          <div v-if="!ticketsToShow" class="text-h6 my-5">
            Aktualnie nie posiadasz żadnych biletów.
          </div>

          <div v-else>
            <div class="text-h6 my-5">
              Twoje aktualne bilety:
            </div>


            <v-row justify="center">
              <div
                  v-for="(ticket, index) in tickets"
                  :item="ticket"
                  :key="index"
              >
                  <v-col md="12" sm="12">
                    <ticket :ticket="ticket" />
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
    <v-row class="my-3">
      <v-col cols="12" md="6" sm="12">

        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="266"
            aspect-ratio="4/3"
            cover
            src="/buySingleTicket.jpeg"
        />

        <div class="text-h5">
          Zakup bilet jednorazowy
        </div>

        <v-btn class="my-4" @click="changeSingleTicketFlag">
          Kup bilet
        </v-btn>
      </v-col>

      <v-col cols="12" md="6" sm="12">

        <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="266"
            aspect-ratio="4/3"
            cover
            src="/buyPeriodicTicket.jpeg"
        />

        <div class="text-h5">
          Zakup bilet okresowy
        </div>

        <v-btn class="my-4" @click="changePeriodicTicketFlag">
          Kup bilet
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>

  <periodicTicketForm :is-show="periodicTicketFlag" @on-close="changePeriodicTicketFlag" />
  <singleTicketForm :is-show="singleTicketFlag" @on-close="changeSingleTicketFlag" />
</template>

<style scoped>

</style>
