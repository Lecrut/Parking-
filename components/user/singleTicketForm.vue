<script setup lang="ts">
import formValidation from '~/composable/formValidation'
import { mapTicketTypeToPrice } from '~/composable/prices'
import type { ICar } from '~/models/Car'
import { requiredRule } from '~/composable/rules'
import type { TicketType } from '~/models/Event'

const props = defineProps < {
  isShow: boolean
  cars: ICar[]
  userId: string
} > ()

const emit = defineEmits < {
  (e: 'onClose'): void
}> ()

const { isShow, cars, userId } = toRefs(props)

const isShowRef = ref < boolean > ()
const selectedCar = ref < string > ('')
const selectedTicketType = ref < string > ('')
const isSnackbarVisible = ref < boolean > (false)

const ticketStore = useTicketStore()
const { freePlace } = storeToRefs(ticketStore)

const { form, valid, isValid } = formValidation()

function close() {
  selectedCar.value = ''
  selectedTicketType.value = ''
  emit('onClose')
}

function prepareEventModel() {
  return {
    car: selectedCar.value || '',
    type: 'Standard' as TicketType,
    fieldNum: freePlace.value as number,
    enterHour: new Date(),
    exitHour: null,
    price: mapTicketTypeToPrice(selectedTicketType.value),
    user: userId.value,
  }
}

const snackBarText = ref<string>()

async function finalize() {
  await ticketStore.fetchFreeSpace()
  if (freePlace.value.valueOf() !== -1 && await isValid()) {
    await ticketStore.addTicket(prepareEventModel())
    snackBarText.value = 'Pomyślnie zakupiono bilet.'
  }
  else if (freePlace.value.valueOf() === -1) {
    snackBarText.value = 'Brak wolnych miejsc.'
  }
  isSnackbarVisible.value = true
  close()
}

const formattedCars = computed(() => {
  return cars.value.map(car => ({
    title: `${car.brand} ${car.model} ${car.registrationNum}`,
    value: car,
  }))
})

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog max-width="800px" :model-value="isShowRef" scrollable @update:model-value="close">
    <v-card>
      <v-card-title>
        Kup bilet jednorazowy
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" @submit.prevent="finalize">
          <v-select v-model="selectedCar" label="Samochód" :items="formattedCars" :rules="[requiredRule()]" />
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

  <SnackbarDefaultSnackbar v-model="isSnackbarVisible" :text="snackBarText" />
</template>
