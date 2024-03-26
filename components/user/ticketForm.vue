<script setup lang="ts">
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
        <p>
          Pojazd: {{ ticket.car }}
        </p>
        <p>
          Rejestracja: {{ ticket.registrationNum }}
        </p>
        <p>
          Miejsce: {{ ticket.fieldNo }}
        </p>
        <p v-if="ticket.type !== 'Jednorazowy'">
          Data ważności: {{ ticket.exitHour }}
        </p>
        <p v-else>
          Bilet ważny od: {{ ticket.enterHour }}
        </p>
        <p>
          Koszt biletu: {{ ticket.price }} PLN
        </p>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn>
          Kod QR
        </v-btn>

        <v-btn @click="close" color="error">
          Zamknij
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
