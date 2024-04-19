import jwt from 'jsonwebtoken'
import type { IUser } from '~/models/User'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const { user } = storeToRefs(auth)

  if (user.value)
    return

  const token = useCookie('session')

  if (token.value) {
    let jwtUser: any

    try {
      jwtUser = jwt.verify(token.value, config.secretKey)

      const user: IUser = {
        email: jwtUser.email,
        name: jwtUser.name,
        role: jwtUser.role,
        password: jwtUser.password,
        __v: jwtUser.__v,
        _id: jwtUser._id,
      }

      auth.setUser(user)
    }
    catch (err) {
      const sessionCookie = useCookie('session')
      sessionCookie.value = null
      await auth.logout()

      if (to.path !== '/')
        return navigateTo('/')
    }
  }
})
