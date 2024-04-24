<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import { useTheme } from 'vuetify'
import formValidation from '~/composable/formValidation'
import type { ICar } from '~/models/Car'
import { requiredRule } from '~/composable/rules'
import '@vuepic/vue-datepicker/dist/main.css'
import { mapTicketTypeToPrice } from '~/composable/prices'
import type { TicketType } from '~/models/Event'
import type { IUser } from '~/models/User'

const props = defineProps < {
  isShow: boolean
  cars: ICar[]
  user: IUser | null
} > ()

const emit = defineEmits < {
  (e: 'onClose'): void
}> ()

const { isShow, cars, user } = toRefs(props)

const { form, valid, isValid } = formValidation()

const ticketStore = useTicketStore()
const { freePlace } = storeToRefs(ticketStore)

const { current } = useTheme()

const isShowRef = ref < boolean > ()
const selectedCar = ref < string > ('')
const selectedTicketType = ref < string > ('')
const selectedDate = ref<Date>(new Date())
const exitDate = ref<Date>(new Date())
const isSnackbarVisible = ref < boolean > (false)
const isPayment = ref(false)

function close() {
  selectedCar.value = ''
  selectedTicketType.value = ''
  selectedDate.value = new Date()
  form.value?.reset()
  emit('onClose')
}

function countExitHour(type: string) {
  const newDate = new Date(selectedDate.value)
  switch (type) {
    case 'Tygodniowy':
      exitDate.value = new Date(newDate.setDate(newDate.getDate() + 7))
      break
    case 'Dzienny':
      exitDate.value = new Date(newDate.setDate(newDate.getDate() + 1))
      break
    case 'Miesięczny':
      exitDate.value = new Date(newDate.setMonth(newDate.getMonth() + 1))
      break
  }
  return exitDate.value
}

function prepareEventModel() {
  return {
    car: selectedCar.value || '',
    type: (selectedTicketType.value || 'Dzienny') as TicketType,
    fieldNum: freePlace.value as number,
    enterHour: selectedDate.value,
    exitHour: countExitHour(selectedTicketType.value),
    price: mapTicketTypeToPrice(selectedTicketType.value),
    user: user.value?._id || null,
    email: user.value?.email || '',
  }
}

const snackBarText = ref<string>()

async function goToPayment() {
  if (!isPayment.value)
    if (await isValid())
      isPayment.value = !isPayment.value
  else
    isPayment.value = !isPayment.value
}

async function finalize() {
  await ticketStore.fetchFreeSpace()
  if (freePlace.value !== -1) {
    await ticketStore.addTicket(prepareEventModel())
    snackBarText.value = 'Pomyślnie zakupiono bilet.'
    isSnackbarVisible.value = true
    close()
  }
  else if (freePlace.value === -1) {
    snackBarText.value = 'Brak wolnych miejsc.'
    isSnackbarVisible.value = true
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

const isDark = computed(() => {
  return current.value.dark
})

watch(isShow, () => {
  if (isShow.value)
    isPayment.value = false
  isShowRef.value = isShow.value
})
</script>

<template>
  <v-dialog max-width="800px" :model-value="isShowRef" @update:model-value="close">
    <v-card min-height="55vh">
      <v-card-title>
        {{ isPayment ? 'Opłać bilet okresowy' : 'Kup bilet okresowy' }}
      </v-card-title>
      <v-card-text class="mt-6">
        <v-form v-if="!isPayment" ref="form" v-model="valid" @submit.prevent="finalize">
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

        <v-row v-else justify="center" class="align-center justify-center text-center">
          <v-col cols="12">
            <div class="text-h5 my-2 mb-5">
              Płatność
            </div>

            <p>
              Kwota do zapłacenia {{ mapTicketTypeToPrice(selectedTicketType) }} zł
            </p>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>

        <v-btn v-if="!isPayment" @click="goToPayment">
          Przejdź do płatności
        </v-btn>

        <v-btn v-if="isPayment" @click="goToPayment">
          Powrót
        </v-btn>

        <v-btn v-if="isPayment" @click="finalize">
          Zapłać
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <SnackbarDefaultSnackbar v-model="isSnackbarVisible" :text="snackBarText" />
</template>
