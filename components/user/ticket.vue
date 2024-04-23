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
const cardColor = ref<string>('')
const cardVariant = ref<'outlined' | 'tonal' | 'flat' | 'text' | 'elevated' | 'plain' | undefined>(undefined)

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

function variant() {
  const currentDate = new Date()
  if (ticket.value.exitHour !== null) {
    const diffInMilliseconds = ticket.value.exitHour.getTime() - currentDate.getTime()
    const diffInHours = diffInMilliseconds / (1000 * 60 * 60)
    if (Math.ceil(diffInHours) <= 6) {
      cardColor.value = '#FF8F00'
      cardVariant.value = 'outlined'
    }
    else {
      cardColor.value = 'primary'
      cardVariant.value = 'tonal'
    }
  }
  else {
    cardColor.value = 'primary'
    cardVariant.value = 'tonal'
  }
}

onMounted(() => variant())
</script>

<template>
  <v-card v-if="!isExpired" :elevation="10" class="pa-3" :variant="cardVariant" :color="cardColor" @click="fullTicketShow = true">
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
      Czas postoju: {{ countTimeAtParking() }}h
    </p>
    <v-btn class="my-4" @click="fullTicketShow = true">
      Szczegóły
    </v-btn>

    <v-img :src="ticket.photoUrl" />
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
