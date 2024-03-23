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

function hideFullTicket() {
  fullTicketShow.value = !fullTicketShow.value
}

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
    <v-btn class="my-4" @click="fullTicketShow = true">
      Szczegóły
    </v-btn>

    <v-dialog v-model="fullTicketShow" max-width="500px" @update:model-value="hideFullTicket">
      <v-card>
        <v-card-title class="headline text-center">
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

          <v-btn @click="hideFullTicket">
            Zamknij
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
