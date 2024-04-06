import type { EventClass } from '~/server/dbModels/EventModel'
import EventModel from '~/server/dbModels/EventModel'

function isEventClass(object: any): object is EventClass {
  return 'registrationNum' in object && 'car' in object && 'type' in object && 'fieldNum' in object && 'enterHour' in object
    && 'exitHour' in object && 'price' in object
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!isEventClass(body))
    throw new Error('Invalid body')

  await new EventModel(body).save()
})
