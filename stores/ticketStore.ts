import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IEvent } from '~/models/Event'

export const useTicketStore = defineStore('tickets', () => {
  const currentTickets: Ref<IEvent[]> = ref([])

  async function addTicket(ticket: IEvent) {
    try {
      await $fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(ticket),
      })
    }
    catch (error) {
      console.error(error)
    }
    currentTickets.value.push(ticket)
  }

  return {
    currentTickets,
    addTicket,
  }
})
