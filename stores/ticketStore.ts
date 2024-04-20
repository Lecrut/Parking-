import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IEvent } from '~/models/Event'

export const useTicketStore = defineStore('tickets', () => {
  const validTickets: Ref<IEvent[]> = ref([])
  const historyTickets: Ref<IEvent[]> = ref([])
  const allTickets: Ref<IEvent[]> = ref([])
  const freePlace: Ref<Number> = ref(-1)
  const ticketToPay: Ref<IEvent | null> = ref(null)
  
  async function addTicket(ticket: IEvent) {
    try {
      await $fetch('/api/events', {
        method: 'POST',
        body: JSON.stringify(ticket),
      })
      validTickets.value.push(ticket)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function endTicket(ticket: IEvent) {
    ticket.exitHour = new Date()
    try {
      await $fetch('/api/events?update=true', {
        method: 'POST',
        body: JSON.stringify(ticket),
      })
    }
    catch (error) {
      console.error(error)
    }
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

  async function fetchTicketsForPlace(parkingPlace: number) {
    try {
      const tickets = await $fetch(`/api/events?fieldNum=${parkingPlace}&status=valid`) as IEvent[]

      tickets.map(mapStringToDateFields)

      allTickets.value = tickets
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

  async function fetchFreeSpace() {
    try {
      freePlace.value = await $fetch('/api/free-space')
    }
    catch (error) {
      console.error(error)
    }
  }

  async function fetchTicketByID(ticketID: String) {
    try {
      const ticket = await $fetch(`/api/events?status=valid&_id=${ticketID}`)
      ticket.map(mapStringToDateFields)
      ticketToPay.value = ticket[0]
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    validTickets,
    historyTickets,
    freePlace,
    allTickets,
    ticketToPay,
    fetchTicketByID,
    fetchFreeSpace,
    addTicket,
    endTicket,
    fetchValidTicketsForUser,
    fetchHistoryTicketsForUser,
    fetchAllValidTickets,
    fetchTicketsForPlace,
  }
})
