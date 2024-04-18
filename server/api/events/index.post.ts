import type { EventClass } from '~/server/dbModels/EventModel'
import EventModel from '~/server/dbModels/EventModel'
import { uploadImageStreamed } from '~/server/utils/blobContainerUtils'

function isEventClass(object: any): object is EventClass {
  return 'car' in object && 'type' in object && 'fieldNum' in object && 'enterHour' in object
    && 'exitHour' in object && 'price' in object && 'user' in object
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!isEventClass(body))
    throw new Error('Invalid body')

  const newEvent = new EventModel(body)
  const url = await uploadImageStreamed(newEvent.id, '../../public/carPhoto.jpg')

  newEvent.photoUrl = url

  await newEvent.save()
})
