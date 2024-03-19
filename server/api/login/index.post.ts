import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '~/server/dbModels/User'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { email, password } = await readBody(event)

  if (!email || !password)
    return new Response('Email and password are required', { status: 400 })

  const user = await UserModel.findOne({ email }).exec()

  if (!user)
    return new Response('User not found', { status: 404 })

  if (!await bcrypt.compare(password, user.password))
    return new Response('Invalid password', { status: 401 })

  const token = jwt.sign(user.toJSON(), config.secretKey, { expiresIn: '3h' })

  setCookie(event, 'session', token, { httpOnly: true })

  return user
})
