import EventModel from '~/server/dbModels/EventModel'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  await new EventModel(body).save()
})
