import type { ContainerClient } from '@azure/storage-blob'
import { BlobServiceClient } from '@azure/storage-blob'

let containerClient: ContainerClient

export const getContainerClient = (): ContainerClient => containerClient

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const blobServiceClient = new BlobServiceClient(`https://${config.accountName}.blob.core.windows.net/?${config.sasToken}`)
  containerClient = blobServiceClient.getContainerClient(config.containerName)

  console.log('Container exists:', await containerClient.exists())
})
