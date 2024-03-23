<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import periodicTicketForm from '~/components/user/periodicTicketForm.vue'
import ticket from '~/components/user/ticket.vue'

const periodicTicketFlag = ref(false)
const ticketsToShow = ref(true)

function changeTicketFlag() {
  periodicTicketFlag.value = !periodicTicketFlag.value
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

const auth = useAuthStore()
</script>

<template>
  <NavBarUser />
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1400" rounded
  >
    <v-row justify="center" class="text-h6 mt-5 mb-5">
      <v-col>
        <div class="text-h2 mt-5 mb-5">
          Witaj, {{ auth.user?.name }}!
        </div>

        <v-row justify="center">
          <v-div v-if="!ticketsToShow" class="text-h6 mt-5 mb-5">
            Aktualnie nie posiadasz żadnych biletów.
          </v-div>

          <v-div v-else>
            <v-div class="text-h5">
              Twoje aktualne bilety:
            </v-div>
            <!-- zrobic to w v-forze -->
            <v-row>
              <v-col>
                <ticket :ticket="tickets[1]" />
              </v-col>

              <v-col>
                <ticket :ticket="tickets[0]" />
              </v-col>

              <v-col>
                <ticket :ticket="tickets[0]" />
              </v-col>
            </v-row>
          </v-div>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1400" rounded
  >
    <v-row class="mt-8">
      <v-col>
        <p class="text-h5">
          Zakup bilet jednorazowy
        </p>
        <v-btn class="my-4">
          Kup bilet
        </v-btn>
      </v-col>

      <v-col>
        <p class="text-h5">
          Zakup bilet okresowy
        </p>

        <v-btn class="my-4" @click="periodicTicketFlag = true">
          Kup bilet
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
  <periodicTicketForm :is-show="periodicTicketFlag" @on-close="changeTicketFlag" />
</template>

<style scoped>

</style>
