<script setup lang="ts">
import NavBarUser from '~/components/navBars/navBarUser.vue'
import periodicTicketForm from '~/components/user/periodicTicketForm.vue'
import ticket from '~/components/user/ticket.vue'
import singleTicketForm from '~/components/user/singleTicketForm.vue'
import type { ICar } from '~/models/Car'

const periodicTicketFlag = ref(false)
const singleTicketFlag = ref(false)

function changePeriodicTicketFlag() {
  periodicTicketFlag.value = !periodicTicketFlag.value
}

function changeSingleTicketFlag() {
  singleTicketFlag.value = !singleTicketFlag.value
}

definePageMeta({
  middleware: ['user-page-guard'],
})

useHead({
  title: 'Użytkownik - Parking+',
})

const authStore = useAuthStore()
const carStore = useCarStore()
const ticketStore = useTicketStore()

const { user } = storeToRefs(authStore)
const { cars } = storeToRefs(carStore)
const { validTickets } = storeToRefs(ticketStore)

const notParkedCars: Ref<ICar[]> = ref([])

function getParkedCars() {
  const parkedCars: ICar[] = []
  validTickets.value.forEach((ticket) => {
    const car = cars.value.find(item => item._id === ticket.car)
    if (car)
      parkedCars.push(car)
  })

  const resultCars: ICar[] = []
  cars.value.forEach((item) => {
    const car = parkedCars.find(element => element === item)
    if (!car)
      resultCars.push(item)
  })

  notParkedCars.value = [...resultCars]
}

onMounted(async () => {
  if (user.value?._id) {
    await carStore.fetchCarsForUser(user.value._id)
    await ticketStore.fetchValidTicketsForUser(user.value._id).then(getParkedCars)
  }
})

watch(validTickets, async (newTickets, oldTickets) => {
  if (JSON.stringify(newTickets) === JSON.stringify(oldTickets))
    return

  if (user.value?._id) {
    await carStore.fetchCarsForUser(user.value._id)
    await ticketStore.fetchValidTicketsForUser(user.value._id).then(getParkedCars)
  }
})
</script>

<template>
  <NavBarUser />
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1100" rounded
  >
    <v-row justify="center" class="text-h6 my-5">
      <v-col cols="12" md="8" sm="12">
        <div class="text-h5 mt-5 mb-5">
          Witaj, {{ authStore.user?.name }}!
        </div>

        <v-row justify="center">
          <div v-if="!validTickets.length" class="text-h6 my-5">
            Aktualnie nie posiadasz żadnych biletów.
          </div>

          <div v-else>
            <div class="text-h6 my-5">
              Twoje aktualne bilety:
            </div>

            <v-row justify="center">
              <div v-for="(ticket, index) in validTickets" :key="index" :item="ticket">
                <v-col md="12" sm="12">
                  <ticket :ticket="ticket" :car="cars.find(item => item._id === ticket.car) || null" />
                </v-col>
              </div>
            </v-row>
          </div>
        </v-row>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1100" rounded
  >
    <v-row class="my-3">
      <v-col cols="12" md="6" sm="12">
        <v-img
          class="mx-auto my-5 elevation-5" rounded="xl" :width="266" aspect-ratio="4/3" cover
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
          class="mx-auto my-5 elevation-5" rounded="xl" :width="266" aspect-ratio="4/3" cover
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

  <periodicTicketForm
    :is-show="periodicTicketFlag" :cars="notParkedCars" :user-id="user?._id || ''"
    @on-close="changePeriodicTicketFlag"
  />

  <singleTicketForm
    :is-show="singleTicketFlag" :cars="notParkedCars" :user-id="user?._id || ''"
    @on-close="changeSingleTicketFlag"
  />
</template>
