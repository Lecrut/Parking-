import mongoose, { set } from 'mongoose'
import jwt from 'jsonwebtoken'
import EventModel from '~/server/dbModels/EventModel'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  if (!query.status)
    return setUpError(400, 'Missing status', event)

  if (query.userId) {
    const userObjectId = new mongoose.Types.ObjectId(String(query.userId))

    if (query.status === 'valid')
      return await EventModel.find({ user: userObjectId, exitHour: null }).exec()

    else if (query.status === 'past')
      return await EventModel.find({ user: userObjectId, exitHour: { $ne: null } }).exec()

    return setUpError(400, 'Invalid status', event)
  }

  if (query.fieldNum) {
    const parkingObjectNo = Number(query.fieldNum)
    try {
      return await EventModel.find({fieldNum: parkingObjectNo}).exec()
    }
    catch (e) {
      return setUpError(401, 'Invalid token', event)
    }
  }

  const config = useRuntimeConfig()
  const token = event.node.req.headers.cookie?.split('=')[1]

  if (!token)
    return setUpError(401, 'Authorization required', event)

  try {
    const jwtUser = jwt.verify(token, config.secretKey) as any

    if (!jwtUser)
      return setUpError(401, 'Unauthorized', event)
  }
  catch (error) {
    return setUpError(401, 'Invalid token', event)
  }

  if (query.status === 'valid')
    return await EventModel.find({ exitHour: null }).exec()

  else if (query.status === 'past')
    return await EventModel.find({ exitHour: { $ne: null } }).exec()

  return setUpError(400, 'Invalid status', event)
})

function setUpError(statusCode: number, message: string, event: any) {
  event.node.res.statusCode = statusCode
  event.node.res.end(message)
}
