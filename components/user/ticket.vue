<script setup lang="ts">
const props = defineProps<{
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

const fullTicketShow = ref(false)

const { ticket } = toRefs(props)
</script>

<template>
  <v-card>
    <v-div>
      Bilet {{ ticket.type }}
    </v-div>
    <p>
      Pojazd: {{ ticket.car }}
    </p>
    <p v-if="ticket.type !== 'Jednorazowy'">
      Data ważności: {{ ticket.exitHour }}
    </p>
    <p v-else>
      Bilet ważny od: {{ ticket.enterHour }}
    </p>
    <v-btn @click="fullTicketShow = true">
      Szczegóły
    </v-btn>

    <v-dialog :is-show="fullTicketShow">
      <v-div>
        Bilet {{ ticket.type }}
      </v-div>
      <p>
        Pojazd: {{ ticket.car }}
      </p>
      <p v-if="ticket.type !== 'Jednorazowy'">
        Data ważności: {{ ticket.exitHour }}
      </p>
      <p v-else>
        Bilet ważny od: {{ ticket.enterHour }}
      </p>
    </v-dialog>
  </v-card>
</template>
