import EventModel from '~/server/dbModels/EventModel'

const currentDate = new Date()

export default defineEventHandler(async () => {
  const tickets = await EventModel.find(
    { $or:
      [
        { $and: [{ exitHour: { $gt: currentDate } }, { enterHour: { $lt: currentDate } }] },
        { exitHour: null },
      ],
    },
  ).exec()

  for (let i = 0; i < 50; i++) {
    if (tickets.find(item => item.fieldNum === i) === undefined)
      return i
  }

  return -1
})
