import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import type { IUser, UserRole } from '~/models/User'

@modelOptions({ schemaOptions: { collection: 'users' } })
export class UserClass implements IUser {
  @prop({ type: String, required: true, trim: true, unique: true })
  email: string

  @prop({ type: String, required: true, trim: true })
  name: string

  @prop({ type: String, required: true, trim: true })
  password: string

  @prop({ type: String, required: true, trim: true })
  role: UserRole
}

const UserModel = getModelForClass(UserClass)

export default UserModel
