<script setup lang="ts">
import formValidation from '~/composable/formValidation'
import type { ICar } from '~/models/Car'
import type { TicketType } from '~/models/Event'
import { requiredRule } from '~/composable/rules'

const props = defineProps < {
  isShow: boolean
  cars: ICar[]
  userId: string
} > ()

const emit = defineEmits < {
  (e: 'onClose'): void
}> ()

const { isShow, cars, userId } = toRefs(props)

const { form, valid, isValid } = formValidation()

const ticketStore = useTicketStore()

const isShowRef = ref < boolean > ()
const selectedCar = ref < string | null > (null)
const selectedTicketType = ref < TicketType | null > (null)

function close() {
  selectedCar.value = null
  selectedTicketType.value = null
  emit('onClose')
}

function prepareEventModel() {
  return {
    car: selectedCar.value || '',
    type: selectedTicketType.value || 'Dzienny',
    fieldNum: 0, // TODO do zmiany
    enterHour: new Date(), // TODO do zmiany
    exitHour: null,
    price: 10, // TODO do zmiany
    user: userId.value,
  }
}

async function finalize() {
  if (await isValid()) {
    ticketStore.addTicket(prepareEventModel())

    // TODO snackbar
    alert('Bilet zakupiony!')
    close()
  }
}

const formattedCars = computed(() => {
  return cars.value.map(car => ({
    title: `${car.brand} ${car.model} ${car.registrationNum}`,
    value: car._id,
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
        <v-form
          ref="form"
          v-model="valid"
          @submit.prevent="finalize"
        >
          <v-select v-model="selectedTicketType" label="Okres" :items="ticketTypes" :rules="[requiredRule()]" />
          <v-select v-model="selectedCar" label="Samochód" :items="formattedCars" :rules="[requiredRule()]" />
          <!-- TODO do dorobienia wybor daty rozpoczecia dla okresowego biletu -->
        </v-form>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>

        <v-btn @click="finalize">
          Przejdź do płatności
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
