import mongoose from 'mongoose'
import CarModel from '~/server/dbModels/CarModel'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const carId = new mongoose.Types.ObjectId(String(body._id))

  await CarModel.findByIdAndUpdate(carId, body).exec()

  return { status: 200 }
})
