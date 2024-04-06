import EventModel from '~/server/dbModels/EventModel'

export default defineEventHandler(async (_event) => {
  try {
    const result = await EventModel.find()
    return result
  }
  catch (err) {
    console.log(err)
  }
})
