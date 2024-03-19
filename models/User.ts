export interface IUser {
  email: string
  name: string
  password: string
  role: UserRole
}

export type UserRole = 'admin' | 'user'
