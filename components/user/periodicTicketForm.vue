<script setup lang="ts">
import type { ICar } from '~/models/Car'
import type { TicketType } from '~/models/Event'

const props = defineProps < {
  isShow: boolean
  cars: ICar[]
} > ()

const emit = defineEmits < {
  (e: 'onClose'): void
}> ()

const { isShow, cars } = toRefs(props)
const isShowRef = ref < boolean > ()
const selectedCar = ref < ICar | null > (null)
const selectedTicketType = ref < TicketType | null > (null)

function close() {
  selectedCar.value = null
  emit('onClose')
}

const formattedCars = computed(() => {
  return cars.value.map(car => ({
    title: `${car.brand} ${car.model} ${car.registrationNum}`,
    value: car,
  }))
})

const ticketTypes = ['Dzienny', 'Tygodniowy', 'Miesięczny']

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog max-width="800px" :model-value="isShowRef" scrollable @update:model-value="close">
    <v-card>
      <v-card-title>
        Kup bilet okresowy
      </v-card-title>
      <v-card-text>
        <v-select v-model="selectedTicketType" label="Okres" :items="ticketTypes" />
        <v-select v-model="selectedCar" label="Samochód" :items="formattedCars" />
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>

        <v-btn>
          Przejdź do płatności
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
