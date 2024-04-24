<script setup lang="ts">
import QRCodeVue3 from "qrcode-vue3";
import type {IEvent} from "~/models/Event";

const props = defineProps<{
  ticket: IEvent | null
}>()

const { ticket } = toRefs(props)

const url = useRequestURL()

const isShown = defineModel<boolean>({ default: false })

const address = computed(() => `${url.host}/ticket/${ticket.value?._id}`
)
</script>

<template>
  <v-dialog v-model="isShown" max-width="800px" @update:model-value="isShown = false">
    <v-card>
      <v-card-title>
        Kod QR - szczegóły biletu
      </v-card-title>

      <v-card-text>
        <v-row justify="center" class="ma-4">
          <QRCodeVue3
              :value="address" :qr-options="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
              :image-options="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }" :dots-options="{
              type: 'dots',
              color: '#26249a',
            }"
          />
        </v-row>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="isShown = false">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
