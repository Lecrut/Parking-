<script setup lang="ts">
import NavBarAdmin from "~/components/navBars/navBarAdmin.vue";

definePageMeta({
  middleware: ['admin-page-guard'],
})

useHead({
  title: "Statystyki - Parking+"
})

const ticketStore = useTicketStore()
const { validTickets, allTickets } = storeToRefs(ticketStore)

const page = ref(1)

const usageValue = computed(() => validTickets.value.length*2)
const standardTicketsValue = computed(() => (
    validTickets.value.length === 0
        ? 0
        : validTickets.value.filter(item => item.type === 'Standard')?.length*2)*100 / usageValue.value
)
const dailyTicketsValue = computed(() => (
    validTickets.value.length === 0
        ? 0
        : validTickets.value.filter(item => item.type === 'Dzienny')?.length*2)*100 / usageValue.value
)
const weeklyTicketsValue = computed(() => (
    validTickets.value.length === 0
        ? 0
        : validTickets.value.filter(item => item.type === 'Tygodniowy')?.length*2)*100 / usageValue.value
)
const monthTicketsValue = computed(() => (
    validTickets.value.length === 0
        ? 0
        : validTickets.value.filter(item => item.type === 'Miesięczny')?.length*2)*100 / usageValue.value
)

const labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24"]

const buyTicketHours = computed(() => {
  const counts = new Array(24).fill(0);

  validTickets.value.forEach((ticket) => {
    const hour = ticket.enterHour.getHours()
    counts[hour]++
  })

  return counts
})

onMounted(async () => {
  if (!validTickets.value.length)
    await ticketStore.fetchAllValidTickets()
  await ticketStore.fetchTicketsForPlace(page.value -1 )
})

watch(page, async () => {
  await ticketStore.fetchTicketsForPlace(page.value -1 )
})
</script>

<template>
  <nav-bar-admin />

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <div class="text-h5 my-5">
          Statystyki aktywnych biletów
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-4">
      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="usageValue"
            :rotate="0"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ (usageValue).toFixed(1) }}%
        </v-progress-circular>

        <div class="text-h6 my-2">
          Zajęte miejsca
        </div>
      </v-col>

      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="standardTicketsValue"
            :rotate="0"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ (standardTicketsValue).toFixed(1) }}%
        </v-progress-circular>

        <div class="text-h6 my-2">
          Aktywne bilety standardowe
        </div>
      </v-col>

      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="dailyTicketsValue"
            :rotate="0"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ (dailyTicketsValue).toFixed(1) }}%
        </v-progress-circular>

        <div class="text-h6 my-2">
          Aktywne bilety całodniowe
        </div>
      </v-col>

      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="weeklyTicketsValue"
            :rotate="0"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ (weeklyTicketsValue).toFixed(1) }}%
        </v-progress-circular>

        <div class="text-h6 my-2">
          Aktywne bilety tygodniowe
        </div>
      </v-col>

      <v-col cols="12" md="4" sm="6" xs="12">
        <v-progress-circular
            :model-value="monthTicketsValue"
            :rotate="0"
            :size="100"
            :width="15"
            color="primary"
        >
          {{ (monthTicketsValue).toFixed(1) }}%
        </v-progress-circular>

        <div class="text-h6 my-2">
          Aktywne bilety miesięczne
        </div>
      </v-col>
    </v-row>

    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <div class="text-h5 mb-2">
          Godziny kupowania biletów
        </div>
      </v-col>
    </v-row>
    <v-row justify="center" class="w-100 mb-5">
      <v-col cols="12" md="8" sm="12">
        <v-sparkline
            :labels="labels"
            :model-value="buyTicketHours"
            :color="$vuetify.theme.current.colors['on-background']"
            line-width="2"
            padding="16"
            :smooth="true"
            :fill="true"
        ></v-sparkline>
      </v-col>
    </v-row>
  </v-sheet>

  <v-sheet
      class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
      elevation="4"
      max-width="1100"
      rounded
  >
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <div class="text-h5 my-5">
          Stastyki indywidualne
        </div>
      </v-col>

      <v-col cols="12" md="8" sm="12">
        <div class="text-h6 my-2">
          Miejsce numer {{page}}
        </div>
      </v-col>
    </v-row>
<!--todo: dodaj komponent z udziałem typów biletów w tym miejscu -->
    {{allTickets}}
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <v-pagination
            v-model="page"
            :length="50"
            class="my-3"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-sheet>
</template>
