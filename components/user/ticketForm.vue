<script setup lang="ts">
import QRCodeVue3 from "qrcode-vue3";

  const props = defineProps < {
    isShow: boolean
    ticket: {
      registrationNum: string
      car: string
      type: string // do zmiany na TicketType
      fieldNo: number
      enterHour: string
      exitHour: string | null
      price: number
    }
  }>()

  const emit = defineEmits<{
    (e: 'onClose'): void
  }>()

  const { isShow, ticket } = toRefs(props)
  const isShowRef = ref<boolean>()

  //TODO: potem zmienić to co wyświetlamy w kodzie po dodaniu poprawnego typu ticket
  function generateQrCodeText() {
    return "register: " + ticket.value.registrationNum
        + ", enter hour: " + ticket.value.enterHour
        + ", field no.: " + ticket.value.fieldNo
        + ", exit hour: " + ticket.value.exitHour
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
              v-model="ticket.car"
              label="Pojazd"
              readonly
            />
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-text-field
                v-model="ticket.registrationNum"
                label="Rejestracja"
                readonly
            />
          </v-col>

          <v-col cols="12" md="6" sm="12">
            <v-text-field
                v-model="ticket.fieldNo"
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
<!--        <p>-->
<!--          Pojazd: {{ ticket.car }}-->
<!--        </p>-->
<!--        <p>-->
<!--          Rejestracja: {{ ticket.registrationNum }}-->
<!--        </p>-->
<!--        <p>-->
<!--          Miejsce: {{ ticket.fieldNo }}-->
<!--        </p>-->
<!--        <p v-if="ticket.type !== 'Jednorazowy'">-->
<!--          Data ważności: {{ ticket.exitHour }}-->
<!--        </p>-->
<!--        <p v-else>-->
<!--          Bilet ważny od: {{ ticket.enterHour }}-->
<!--        </p>-->
<!--        <p>-->
<!--          Koszt biletu: {{ ticket.price }} PLN-->
<!--        </p>-->

        <v-row justify="center" class="ma-4">
          <QRCodeVue3
              :value="generateQrCodeText()"
              :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
              :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
              :dotsOptions="{
                type: 'dots',
                color: '#26249a',
              }"
          />
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn @click="close" color="error">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
