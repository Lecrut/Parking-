<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { useTheme } from 'vuetify'
import formValidation from '~/composable/formValidation'
import type { ICar } from '~/models/Car'
import { requiredRule } from '~/composable/rules'
import '@vuepic/vue-datepicker/dist/main.css'
import { mapTicketTypeToPrice } from '~/composable/prices'
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

const { form, valid, isValid } = formValidation()

const ticketStore = useTicketStore()
const { freePlace } = storeToRefs(ticketStore)

const { current } = useTheme()

const isShowRef = ref < boolean > ()
const selectedCar = ref < string > ('')
const selectedTicketType = ref < string > ('')
const selectedDate = ref< Date > (new Date())
const isSnackbarVisible = ref < boolean > (false)

function close() {
  selectedCar.value = ''
  selectedTicketType.value = ''
  selectedDate.value = new Date()
  emit('onClose')
}

function prepareEventModel() {
  return {
    car: selectedCar.value || '',
    type: (selectedTicketType.value || 'Dzienny') as TicketType,
    fieldNum: freePlace.value as number,
    enterHour: selectedDate.value,
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
    value: car._id,
  }))
})

const ticketTypes = ['Dzienny', 'Tygodniowy', 'Miesięczny']

const isDark = computed(() => {
  return current.value.dark
})

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog max-width="800px" :model-value="isShowRef" @update:model-value="close">
    <v-card min-height="55vh">
      <v-card-title>
        Kup bilet okresowy
      </v-card-title>
      <v-card-text class="mt-6">
        <v-form ref="form" v-model="valid" @submit.prevent="finalize">
          <span>Wybierz datę początkową</span>
          <VueDatePicker
            v-model="selectedDate" class="mt-2" :dark="isDark" auto-apply :enable-time-picker="true"
            label="Wybierz datę i godzinę" :min-date="new Date()" position="left"
          />

          <v-divider class="my-8" />

          <v-select
            v-model="selectedTicketType" class="mb-4" label="Okres" density="comfortable" :items="ticketTypes"
            :rules="[requiredRule()]"
          />
          <v-select
            v-model="selectedCar" label="Samochód" density="comfortable" :items="formattedCars"
            :rules="[requiredRule()]"
          />

          <div v-if="selectedTicketType" class="ml-1 mt-2">
            Cena: {{ mapTicketTypeToPrice(selectedTicketType) }} zł
          </div>
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
