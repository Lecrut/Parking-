<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import ticket from '~/components/user/ticket.vue'
import expiredTicket from '~/components/user/expiredTicket.vue'

//todo: do wywalenia
const activeTickets = [
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
    enterHour: '05-04-2024 12:00:00',
    exitHour: '12-04-2024 12:00:00',
    price: 100,
  },
]

const allTickets = [
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
    enterHour: '05-04-2024 12:00:00',
    exitHour: '12-04-2024 12:00:00',
    price: 100,
  },
  {
    registrationNum: 'EZG 12345',
    car: 'Honda Civic',
    type: 'Miesięczny',
    fieldNo: 10,
    enterHour: '22-02-2024 10:00:00',
    exitHour: '22-03-2024 10:00:00',
    price: 200,
  },
]
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
          <div v-if="!activeTickets.length" class="text-h5 my-5">
            Aktualnie nie posiadasz żadnych biletów.
          </div>

          <div v-else>
            <div class="text-h5 my-5">
              Twoje aktualne bilety:
            </div>

            <v-row justify="center">
              <div
                  v-for="(ticket, index) in activeTickets"
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
    <v-row justify="center" class="text-h6 mt-5 mb-5">
      <v-col cols="12" md="8" sm="12">
        <v-row justify="center">
          <div class="text-h5 my-5">
            Historia:
          </div>

          <v-row justify="center">
            <div v-for="(ticket, index) in allTickets" :key="index" :item="ticket">
              <v-col md="12" sm="12">
                <expiredTicket :ticket="ticket" />
              </v-col>
            </div>
          </v-row>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>
</template>
