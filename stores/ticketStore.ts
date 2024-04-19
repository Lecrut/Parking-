import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IEvent } from '~/models/Event'

export const useTicketStore = defineStore('tickets', () => {
  const validTickets: Ref<IEvent[]> = ref([])
  const historyTickets: Ref<IEvent[]> = ref([])
  const allTickets: Ref<IEvent[]> = ref([])
  const freePlace: Ref<Number> = ref(-1)
  
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
      const tickets = await $fetch('/api/events?status=valid') as IEvent[]

      tickets.map(mapStringToDateFields)

      const placeTable = ref(Array.from({ length: 50 }, _ => ({
        placeTicket: null as IEvent | null,
      })))

      placeTable.value.forEach((element, index) => {
        if (tickets.find(item => item.fieldNum === index) === undefined)
          freePlace.value = index
      })
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
    fetchFreeSpace,
    addTicket,
    fetchValidTicketsForUser,
    fetchHistoryTicketsForUser,
    fetchAllValidTickets,
    fetchTicketsForPlace,
  }
})
