import UserModel from '~/server/models/User'

export default defineEventHandler(async (_event) => {
  try {
    const result = await UserModel.find()
    return result
  }
  catch (err) {
    console.log(err)
  }
})
