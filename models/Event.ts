export interface IEvent {
  car: string
  type: TicketType
  fieldNum: number
  enterHour: Date
  exitHour: Date | null
  price: number
  __v?: string
  _id?: string
}

export type TicketType = 'standard' | 'daily' | 'weekly' | 'monthly'
