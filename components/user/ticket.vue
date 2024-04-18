<script setup lang="ts">
import TicketForm from '~/components/user/ticketForm.vue'
import type { IEvent } from '~/models/Event'
import type { ICar } from '~/models/Car'
import { mapDate } from '~/composable/time'

const props = defineProps<{
  ticket: IEvent
  car: ICar | null
  isExpired?: boolean
}>()

const fullTicketShow = ref(false)

function hideFullTicket() {
  fullTicketShow.value = !fullTicketShow.value
}

const { ticket, car } = toRefs(props)

function countTimeAtParking() {
  const currentDate = new Date()
  const diffInMilliseconds = currentDate.getTime() - ticket.value.enterHour.getTime()
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60)
  return Math.ceil(diffInHours)
}
</script>

<template>
  <v-card v-if="!isExpired" :elevation="10" class="pa-3" @click="fullTicketShow = true">
    <div class="text-h5 my-2">
      Bilet {{ ticket.type }}
    </div>
    <p>
      Samochód: {{ car?.brand }} {{ car?.model }}
    </p>
    <p>
      Ważny od: {{ mapDate(ticket.enterHour) }}
    </p>
    <p v-if="ticket.exitHour !== null || ticket.type !== 'Standard'">
      Ważny do: {{ ticket.exitHour ? mapDate(ticket.exitHour) : '' }}
    </p>
    <p v-else>
      Czas: {{ countTimeAtParking() }}h
    </p>
    <v-btn class="my-4" @click="fullTicketShow = true">
      Szczegóły
    </v-btn>
  </v-card>

  <v-card v-else :elevation="10" class="pa-3" @click="fullTicketShow = true">
    <div class="text-h5 my-2">
      Bilet {{ ticket.type }}
    </div>

    <p>
      Samochód: {{ car?.brand }} {{ car?.model }}
    </p>
    <p>
      Wygasły: {{ ticket.exitHour ? mapDate(ticket.exitHour) : '' }}
    </p>
    <v-btn class="my-4" @click="fullTicketShow = true">
      Szczegóły
    </v-btn>
  </v-card>

  <TicketForm :is-show="fullTicketShow" :ticket="ticket" :car="car" @on-close="hideFullTicket" />
</template>
