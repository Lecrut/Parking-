import type { Ref } from '@typegoose/typegoose'
import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { UserClass } from './UserModel'
import type { ICar } from '~/models/Car'

@modelOptions({ schemaOptions: { collection: 'cars' } })
export class CarClass implements ICar {
  @prop({ type: () => String, required: true, trim: true })
  brand: string

  @prop({ type: () => String, required: true, trim: true })
  model: string

  @prop({ ref: () => UserClass, required: true })
  owner: string

  @prop({ type: () => String, required: true, trim: true, unique: true })
  registrationNum: string
}

const CarModel = getModelForClass(CarClass)

export default CarModel
