export interface IEvent {
  car: string
  type: TicketType
  fieldNum: number
  enterHour: Date
  exitHour: Date | null
  price: number
  user: string
  __v?: string
  _id?: string
}

export type TicketType = 'Standard' | 'Dzienny' | 'Tygodniowy' | 'Miesięczny'
