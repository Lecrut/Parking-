import mongoose from 'mongoose'

export default async () => {
  const config = useRuntimeConfig()

  mongoose
    .connect(config.mongoUri)
    .then(() => console.log('Connected to DB'))
    .catch(err => console.log(err))
}
