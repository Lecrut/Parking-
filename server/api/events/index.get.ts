import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import type { NitroRuntimeConfig } from 'nitropack'
import EventModel from '~/server/dbModels/EventModel'

export default defineEventHandler<{ query: { status: string, userId: string } }>(async (event) => {
  const query = getQuery(event)

  if (!query.status)
    return setUpError(400, 'Missing status', event)

  if (query.userId)
    return await findEventsForUser(query) || setUpError(400, 'Invalid status', event)

  const config = useRuntimeConfig()
  const token = event.node.req.headers.cookie?.split('=')[1]

  if (!token)
    return setUpError(401, 'Authorization required', event)

  try {
    verifyJwt(token, config, event)
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

async function findEventsForUser(query: { status: string, userId: string }) {
  const userObjectId = new mongoose.Types.ObjectId(String(query.userId))

  if (query.status === 'valid')
    return await EventModel.find({ user: userObjectId, exitHour: null }).exec()

  else if (query.status === 'past')
    return await EventModel.find({ user: userObjectId, exitHour: { $ne: null } }).exec()
}

function verifyJwt(token: string, config: NitroRuntimeConfig, event: any) {
  const jwtUser = jwt.verify(token, config.secretKey) as any

  if (!jwtUser)
    return setUpError(401, 'Unauthorized', event)

  if (jwtUser.role !== 'admin')
    return setUpError(403, 'Forbidden', event)
}
