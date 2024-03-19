import UserModel from '~/server/dbModels/User'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body, 'api post')

  await new UserModel(body).save()
})
