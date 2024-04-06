import mongoose from 'mongoose'
import EventModel from '~/server/dbModels/EventModel'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query.userId) {
    return {
      statusCode: 400,
      body: 'Missing userId',
    }
  }

  const userObjectId = new mongoose.Types.ObjectId(String(query.userId))

  const userTickets = await EventModel.find({ user: userObjectId }).exec()

  return userTickets
})
