<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3'
import type { IEvent } from '~/models/Event'
import type {ICar} from "~/models/Car";

const props = defineProps < {
  isShow: boolean
  ticket: IEvent
  car: ICar | null
}>()

const emit = defineEmits<{
  (e: 'onClose'): void
}>()

const { isShow, ticket, car } = toRefs(props)
const isShowRef = ref<boolean>()

const getCar = computed(() => car.value ? car.value.brand + ' ' + car.value.model : ' ' )
const getCarRegister = computed(() => car.value ? car.value.registrationNum : ' ' )
function generateQrCodeText() {
  return `register: ${car.value?.registrationNum
  }, enter hour: ${ticket.value.enterHour
  }, field no.: ${ticket.value.fieldNum
  }, exit hour: ${ticket.value.exitHour}`
}
function close() {
  emit('onClose')
}

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog
    max-width="800px"
    :model-value="isShowRef"
    scrollable
    @update:model-value="close"
  >
    <v-card>
      <v-card-title>
        Bilet {{ ticket.type }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="getCar"
              label="Pojazd"
              readonly
            />
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="getCarRegister"
              label="Rejestracja"
              readonly
            />
          </v-col>

          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="ticket.fieldNum"
              label="Miejsce"
              readonly
            />
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="ticket.price"
              label="Cena"
              readonly
              suffix="zł"
            />
          </v-col>

          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="ticket.enterHour"
              label="Czas wjazdu"
              readonly
            />
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
              v-model="ticket.exitHour"
              label="Czas wyjazdu"
              readonly
            />
          </v-col>
        </v-row>

        <v-row justify="center" class="ma-4">
          <QRCodeVue3
            :value="generateQrCodeText()"
            :qr-options="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
            :image-options="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
            :dots-options="{
              type: 'dots',
              color: '#26249a',
            }"
          />
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
