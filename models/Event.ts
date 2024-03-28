import type { Ref } from '@typegoose/typegoose'
import type { CarClass } from '~/server/dbModels/CarModel'

export interface IEvent {
  registrationNum: string
  car: Ref<CarClass>
  type: TicketType
  fieldNum: number
  enterHour: Date
  exitHour: Date | null
  price: number
  __v?: string
  _id?: string
}

export type TicketType = 'standard' | 'daily' | 'weekly' | 'monthly'
