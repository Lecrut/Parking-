<script setup lang="ts">
import TicketForm from '~/components/user/ticketForm.vue'
import type { IEvent } from '~/models/Event'

const props = defineProps<{
  ticket: IEvent
}>()

const fullTicketShow = ref(false)

function hideFullTicket() {
  fullTicketShow.value = !fullTicketShow.value
}

const { ticket } = toRefs(props)
</script>

<template>
  <v-card :elevation="10" class="pa-3" @click="fullTicketShow = true">
    <div class="text-h5 my-2">
      Bilet {{ ticket.type }}
    </div>
    <p>
      Samochód: {{ ticket.car }}
    </p>
    <p>
      Ważny od: {{ ticket.enterHour }}
    </p>
    <p>
      Ważny do: {{ ticket.exitHour }}
    </p>
    <v-btn class="my-4" @click="fullTicketShow = true">
      Szczegóły
    </v-btn>
  </v-card>

  <TicketForm
    :is-show="fullTicketShow"
    :ticket="ticket"
    @on-close="hideFullTicket"
  />
</template>
