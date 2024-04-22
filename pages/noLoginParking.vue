<script setup lang="ts">
import NavBar from '~/components/navBars/navBar.vue'
import { emailRule, firstSignRule, registerLengthRule, requiredRule } from '~/composable/rules'
import formValidation from '~/composable/formValidation'
import type { ICar } from '~/models/Car'
import '@vuepic/vue-datepicker/dist/main.css'
import { mapTicketTypeToPrice } from '~/composable/prices'
import type { TicketType } from '~/models/Event'

definePageMeta({
  middleware: ['guest-page-guard'],
})

const { form, valid, isValid } = formValidation()

const ticketStore = useTicketStore()
const { freePlace } = storeToRefs(ticketStore)

const carStore = useCarStore()
const { addCarError } = storeToRefs(carStore)

const exitDate = ref<Date>(new Date())
const emailAddress = ref<string>('')
const registerNum = ref<string>('')
const rules = ref<boolean>(false)
const snackbarColor = ref<string>('primary')

function close() {
  emailAddress.value = ''
  registerNum.value = ''
  rules.value = false
  form.value?.reset()
  exitDate.value = new Date()
}

function countExitHour(type: string) {
  switch (type) {
    case 'Tygodniowy':
      exitDate.value.setDate(exitDate.value.getDate() + 7)
      break
    case 'Dzienny':
      exitDate.value.setDate(exitDate.value.getDate() + 1)
      break
    case 'Miesięczny':
      exitDate.value.setDate(exitDate.value.getDate() + 30)
      break
  }
  return exitDate.value
}

async function prepareCarModel() {
  const car = {
    owner: null,
    email: emailAddress.value,
    registrationNum: registerNum.value,
  }

  // TODO warunki businness logic
  return await carStore.addCar(car)
}

async function prepareEventModel() {
  return {
    car: (await prepareCarModel())?.id || '',
    type: ('Dzienny') as TicketType,
    fieldNum: freePlace.value as number,
    enterHour: new Date(),
    exitHour: countExitHour('Dzienny'),
    price: mapTicketTypeToPrice('Dzienny'),
    user: null,
    email: emailAddress.value,
  }
}

const snackBarText = ref<string>()
const isSnackbarVisible = ref<boolean>(false)

async function finalize() {
  await ticketStore.fetchFreeSpace()
  if (freePlace.value !== -1 && await isValid()) {
    await ticketStore.addTicket(await prepareEventModel())

    if (addCarError.value) {
      snackBarText.value = 'Istnieje już samochód o podanym numerze rejestracyjnym.'
      snackbarColor.value = 'error'
      isSnackbarVisible.value = true
      return
    }

    snackBarText.value = 'Pomyślnie zakupiono bilet.'
    isSnackbarVisible.value = true
    snackbarColor.value = 'primary'
    close()
  }
  else if (freePlace.value === -1) {
    snackBarText.value = 'Brak wolnych miejsc.'
    isSnackbarVisible.value = true
    snackbarColor.value = '#FFA726'
    close()
  }
}

useHead({
  title: 'Szybki parking - Parking+',
})
</script>

<template>
  <NavBar />

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4" elevation="4"
    max-width="1100" rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 pa-6">
          <v-img
            class="mx-auto my-5 elevation-5" rounded="xl" :width="300" aspect-ratio="4/3" cover
            src="/noLogged.jpeg"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 py-3">
          <div class="text-h5 my-2">
            Parkowanie bez konta
          </div>

          <p class="my-2">
            Wypełnij formularz aby przejść do płatności i otrzymać bilet parkingowy.
          </p>

          <v-form ref="form" v-model="valid" class="w-75 my-2" @submit.prevent="finalize">
            <v-text-field
              v-model="registerNum"
              label="Numer rejestracyjny"
              :rules="[firstSignRule(), requiredRule(), registerLengthRule()]"
            />

            <v-text-field v-model="emailAddress" label="Adres Email" placeholder="example@mail.com" type="email" :rules="[emailRule()]" />

            <v-checkbox v-model="rules" label="Akceptuję regulamin" :rules="[requiredRule()]" />

            <v-btn @click="finalize()">
              Zatwierdź
            </v-btn>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-sheet>

  <SnackbarDefaultSnackbar v-model="isSnackbarVisible" :text="snackBarText" :color="snackbarColor" />
  <!--  todo: naprawic stopke -->
  <!--  <MyFooter /> -->
</template>
