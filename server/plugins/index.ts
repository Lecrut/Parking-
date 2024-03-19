import mongoose from 'mongoose'
import type { Nitro } from 'nitroPack'
import { UserClass } from '../dbModels/User'
import { useAuthStore } from '~/stores/auth'

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig()

  mongoose
    .connect(config.mongoUri)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err))
}
