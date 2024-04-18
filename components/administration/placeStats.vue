<script setup lang="ts">
import type {IEvent} from "~/models/Event";

const props = defineProps < {
  tickets: IEvent[]
}>()

const { tickets } = toRefs(props)

const standardTicketsValue = computed(() => (
    tickets.value.length === 0
        ? 0
        : tickets.value.filter(item => item.type === 'Standard')?.length/tickets.value.length)*100
)
const dailyTicketsValue = computed(() => (
    tickets.value.length === 0
        ? 0
        : tickets.value.filter(item => item.type === 'Dzienny')?.length/tickets.value.length)*100
)
const weeklyTicketsValue = computed(() => (
    tickets.value.length === 0
        ? 0
        : tickets.value.filter(item => item.type === 'Tygodniowy')?.length/tickets.value.length)*100
)
const monthTicketsValue = computed(() => (
    tickets.value.length === 0
        ? 0
        : tickets.value.filter(item => item.type === 'Miesięczny')?.length/tickets.value.length)*100
)

</script>

<template>
  <v-row justify="center">
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
        Bilety standardowe
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
        Bilety całodniowe
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
        Bilety tygodniowe
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
        Bilety miesięczne
      </div>
    </v-col>
  </v-row>
</template>
