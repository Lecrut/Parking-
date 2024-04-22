<script setup lang="ts">
import formValidation from '~/composable/formValidation'
import { mapTicketTypeToPrice } from '~/composable/prices'
import type { ICar } from '~/models/Car'
import { requiredRule } from '~/composable/rules'
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
  form.value?.reset()

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
    user: user.value?._id || null,
    email: user.value?.email || '',
  }
}

const snackBarText = ref<string>()

async function finalize() {
  await ticketStore.fetchFreeSpace()
  if (freePlace.value !== -1 && await isValid()) {
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
