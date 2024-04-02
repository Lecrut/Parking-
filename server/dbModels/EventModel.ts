import type { Ref } from '@typegoose/typegoose'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { CarClass } from './CarModel'
import type { IEvent, TicketType } from '~/models/Event'

@modelOptions({ schemaOptions: { collection: 'events' } })
export class EventClass implements IEvent {
  @prop({ type: () => String, required: true, trim: true })
  registrationNum: string

  @prop({ ref: () => CarClass, required: true })
  car: string

  @prop({ type: () => String, required: true, trim: true })
  type: TicketType

  @prop({ type: () => Number, required: true, trim: true })
  fieldNum: number

  @prop({ type: () => Date, required: true, trim: true })
  enterHour: Date

  @prop({ type: () => Date, trim: true })
  exitHour: Date | null

  @prop({ type: () => Number, trim: true })
  price: number
}

const EventModel = getModelForClass(EventClass)

export default EventModel
