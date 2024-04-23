import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { CarClass } from './CarModel'
import { UserClass } from './UserModel'
import type { IEvent, TicketType } from '~/models/Event'

@modelOptions({ schemaOptions: { collection: 'events' } })
export class EventClass implements IEvent {
  @prop({ ref: () => CarClass, required: true })
  car: string

  @prop({ type: () => String, required: true, trim: true })
  type: TicketType

  @prop({ type: () => Number, required: true })
  fieldNum: number

  @prop({ type: () => Date, required: true })
  enterHour: Date

  @prop({ type: () => Date })
  exitHour: Date | null

  @prop({ type: () => Number })
  price: number

  @prop({ ref: () => UserClass })
  user: string

  @prop({ type: () => String, required: true })
  email: string

  @prop({ type: () => String })
  photoUrl: string
}

const EventModel = getModelForClass(EventClass)

export default EventModel
