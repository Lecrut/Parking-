import bcrypt from 'bcrypt'
import UserModel from '~/server/dbModels/User'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  if (!email || !password)
    return new Response('Email and password are required', { status: 400 })

  const user = await UserModel.findOne({ email }).exec()

  if (!user)
    return new Response('User not found', { status: 404 })

  if (!await bcrypt.compare(password, user.password))
    return new Response('Invalid password', { status: 401 })

  return user
})
