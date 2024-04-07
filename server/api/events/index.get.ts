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
  else if (!query.status) {
    return {
      statusCode: 400,
      body: 'Missing status',
    }
  }

  const userObjectId = new mongoose.Types.ObjectId(String(query.userId))

  let userTickets

  if (query.status === 'valid') {
    userTickets = await EventModel.find({ user: userObjectId, exitHour: null }).exec()
  }
  else if (query.status === 'past') {
    userTickets = await EventModel.find({ user: userObjectId, exitHour: { $ne: null } }).exec()
  }
  else {
    return {
      statusCode: 400,
      body: 'Invalid status',
    }
  }

  return userTickets
})
