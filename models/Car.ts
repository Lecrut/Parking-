import type { Ref } from '@typegoose/typegoose'
import type { UserClass } from '~/server/dbModels/UserModel'

export interface ICar {
  brand: string
  model: string
  owner: Ref<UserClass>
  registrationNum: number
  __v?: string
  _id?: string
}
