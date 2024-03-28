import bcrypt from 'bcrypt'
import UserModel from '~/server/dbModels/UserModel'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  body.password = await bcrypt.hash(body.password, 10)

  await new UserModel(body).save()
})
