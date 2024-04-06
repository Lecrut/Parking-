import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IEvent } from '~/models/Event'

export const useTicketStore = defineStore('tickets', () => {
  const currentTickets: Ref<IEvent[]> = ref([])

  return {
    currentTickets,
  }
})
