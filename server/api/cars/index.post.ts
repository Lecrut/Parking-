import CarModel from '~/server/dbModels/CarModel'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await new CarModel(body).save()
})
