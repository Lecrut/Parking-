export interface IEvent {
  registrationNum: string
  car: string
  type: TicketType
  fieldNo: number
  enterHour: Date
  exitHour: Date | null
  price: number
  __v?: string
  _id?: string
}

export type TicketType = 'standard' | 'daily' | 'weekly' | 'monthly'
