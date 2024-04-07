import jwt from 'jsonwebtoken'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const authHeader = event.node.req.url

  const guestRoutes = getGuestRoutes()

  if (authHeader?.split('/')[1] !== 'api')
    return

  if (!authHeader || guestRoutes.includes(authHeader))
    return

  const token = event.node.req.headers.cookie?.split('=')[1]

  if (!token) {
    event.node.res.statusCode = 401
    event.node.res.end('Authorization required')
    return
  }

  try {
    const _jwtUser = jwt.verify(token, config.secretKey)
  }
  catch (error) {
    event.node.res.statusCode = 401
    event.node.res.end('Invalid token')
  }
})

function getGuestRoutes() {
  return ['/api/login', '/api/login']
}
