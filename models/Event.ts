export interface IEvent {
  car: string | object
  type: TicketType
  fieldNum: number
  enterHour: Date
  exitHour: Date | null
  price: number
  user: string | null
  email: string
  photoUrl?: string
  __v?: string
  _id?: string
}

export type TicketType = 'Standard' | 'Dzienny' | 'Tygodniowy' | 'Miesięczny'
