<script setup lang="ts">
import NavBarAdmin from "~/components/navBars/navBarAdmin.vue";

const ticketStore = useTicketStore()
const { validTickets } = storeToRefs(ticketStore)

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

onMounted(async () => {
  if (!validTickets.value.length)
    await ticketStore.fetchAllValidTickets()
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
<!--    {{validTickets}}-->
    <v-row justify="center" class="w-100">
      <v-col cols="12" md="8" sm="12">
        <div class="text-h5 my-5">
          Statystyki biletów
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
  </v-sheet>
</template>
