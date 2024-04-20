import EventModel from '~/server/dbModels/EventModel'

export default defineEventHandler(async () => {
  const tickets = await EventModel.find({ exitHour: null }).exec()

  for (let i = 0; i < 50; i++) {
    if (tickets.find(item => item.fieldNum === i) === undefined)
      return i
  }

  return -1
})
