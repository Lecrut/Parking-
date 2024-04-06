import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IEvent } from '~/models/Event'

export const useTicketStore = defineStore('tickets', () => {
  const currentTickets: Ref<IEvent[]> = ref([])

  async function addTicket(ticket: IEvent, userId: string) {
    try {
      await $fetch(`/api/tickets?userId=${userId}`, {
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
