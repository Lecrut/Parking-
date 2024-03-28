import type { Ref } from '@typegoose/typegoose'
import { modelOptions, prop } from '@typegoose/typegoose'
import { UserClass } from './UserModel'
import type { ICar } from '~/models/Car'

@modelOptions({ schemaOptions: { collection: 'cars' } })
export class CarClass implements ICar {
  @prop({ type: () => String, required: true, trim: true })
  brand: string

  @prop({ type: () => String, required: true, trim: true })
  model: string

  @prop({ type: () => UserClass, required: true, trim: true })
  owner: Ref<UserClass>

  @prop({ type: () => Number, required: true, trim: true })
  registrationNum: number
}
