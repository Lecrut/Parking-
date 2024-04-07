import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IEvent } from '~/models/Event'

export const useTicketStore = defineStore('tickets', () => {
  const validTickets: Ref<IEvent[]> = ref([])
  const historyTickets: Ref<IEvent[]> = ref([])

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
    validTickets.value.push(ticket)
  }

  function mapStringToDateFields(ticket: IEvent) {
    ticket.enterHour = new Date(ticket.enterHour)
    ticket.exitHour = ticket.exitHour ? new Date(ticket.exitHour) : null
    return ticket
  }

  async function fetchValidTicketsForUser(userId: string) {
    try {
      const tickets = await $fetch(`/api/events?userId=${userId}&status=valid`) as IEvent[]

      tickets.map(mapStringToDateFields)

      validTickets.value = tickets
    }
    catch (error) {
      console.error(error)
    }
  }

  async function fetchHistoryTicketsForUser(userId: string) {
    try {
      const tickets = await $fetch(`/api/events?userId=${userId}&status=past`) as IEvent[]

      tickets.map(mapStringToDateFields)

      historyTickets.value = tickets
    }
    catch (error) {
      console.error(error)
    }
  }

  async function fetchAllValidTickets() {
    try {
      const tickets = await $fetch('/api/events?status=valid') as IEvent[]

      tickets.map(mapStringToDateFields)

      validTickets.value = tickets
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    validTickets,
    historyTickets,
    addTicket,
    fetchValidTicketsForUser,
    fetchHistoryTicketsForUser,
    fetchAllValidTickets,
  }
})
