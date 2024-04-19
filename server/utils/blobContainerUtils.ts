import { createReadStream } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getContainerClient } from '~/server/plugins/blobPlugin'

export async function uploadImageStreamed(blobName: string, relativePath: string): Promise<string> {
  const blobClient = getContainerClient().getBlockBlobClient(blobName)

  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  const path = join(__dirname, relativePath)

  const dataStream = createReadStream(path)

  const uploadOptions = {
    blobHTTPHeaders: {
      blobContentType: 'image/jpeg',
    },
  }
  await blobClient.uploadStream(dataStream, undefined, undefined, uploadOptions)

  return blobClient.url
}
