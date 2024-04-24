import mongoose from 'mongoose'
import CarModel from '~/server/dbModels/CarModel'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (query._id) {
    const carId = new mongoose.Types.ObjectId(String(query._id))
    return await CarModel.find({ _id: carId }).exec()
  }

  if (!query.userId && !query.registrationNum) {
    return {
      statusCode: 400,
      body: 'Missing userId or registrationNum in query params',
    }
  }

  let filter = {}

  if (query.userId)
    filter = { owner: new mongoose.Types.ObjectId(String(query.userId)) }

  if (query.registrationNum)
    filter = { ...filter, registrationNum: query.registrationNum }

  const userCars = await CarModel.find(filter).exec()

  return userCars
})
