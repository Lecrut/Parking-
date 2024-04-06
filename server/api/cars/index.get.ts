import mongoose from 'mongoose'
import CarModel from '~/server/dbModels/CarModel'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query.userId) {
    return {
      statusCode: 400,
      body: 'Missing userId',
    }
  }

  const userObjectId = new mongoose.Types.ObjectId(String(query.userId))

  const userCars = await CarModel.find({ owner: userObjectId }).exec()

  return userCars
})
