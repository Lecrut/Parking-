import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import type { NitroRuntimeConfig } from 'nitropack'
import EventModel from '~/server/dbModels/EventModel'

export default defineEventHandler<{ query: { status: string, userId: string, fieldNum: string, _id: string } }>(async (event) => {
  const query = getQuery(event)
  const current_date = new Date()

  if (!query.status)
    return setUpError(400, 'Missing status', event)

  if (query.userId)
    return await findEventsForUser(query) || setUpError(400, 'Invalid status', event)

  if (query._id) {
    const eventId = new mongoose.Types.ObjectId(String(query._id))
    return await EventModel.find({ _id: eventId }).exec()
  }

  if (query.fieldNum) {
    const parkingObjectNo = Number(query.fieldNum)
    try {
      return await EventModel.find({ fieldNum: parkingObjectNo }).exec()
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
    const result = verifyJwt(token, config, event)

    if (result.code !== 200)
      return setUpError(result.code, result.description, event)
  }
  catch (error) {
    return setUpError(401, 'Invalid token', event)
  }

  if (query.status === 'valid') {
    return await EventModel.find({
      $or: [
        { exitHour: { $gt: current_date } },
        { exitHour: null },
      ],
    }).exec()
  }

  else if (query.status === 'past') { return await EventModel.find({ exitHour: { $lt: current_date } }).exec() }

  return setUpError(400, 'Invalid status', event)
})

function setUpError(statusCode: number, message: string, event: any) {
  event.node.res.statusCode = statusCode
  event.node.res.end(message)
}

async function findEventsForUser(query: { status: string, userId: string }) {
  const userObjectId = new mongoose.Types.ObjectId(String(query.userId))
  const current_date = new Date()

  if (query.status === 'valid') {
    return await EventModel.find({
      user: userObjectId,
      $or: [
        { exitHour: { $gt: current_date } },
        { exitHour: null },
      ],
    }).exec()
  }

  else if (query.status === 'past') { return await EventModel.find({ user: userObjectId, exitHour: { $lt: current_date } }).exec() }
  // if (query.status === 'valid')
  //   return await EventModel.find({ user: userObjectId, exitHour: null }).exec()

  // else if (query.status === 'past')
  //   return await EventModel.find({ user: userObjectId, exitHour: { $ne: null } }).exec()
}

function verifyJwt(token: string, config: NitroRuntimeConfig, event: any) {
  const jwtUser = jwt.verify(token, config.secretKey) as any

  if (!jwtUser)
    return { code: 401, description: 'Invalid token', event }

  if (jwtUser.role !== 'admin')
    return { code: 403, description: 'Forbidden', event }

  return { code: 200, description: 'Success', event }
}
