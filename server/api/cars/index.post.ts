import CarModel from '~/server/dbModels/CarModel'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const newModel = await new CarModel(body).save()

  return { id: newModel._id, code: 200 }
})
