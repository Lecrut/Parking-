export interface IUser {
  email: string
  name: string
  password: string
  role: UserRole
  __v?: string
  _id?: string
}

export type UserRole = 'admin' | 'user'
