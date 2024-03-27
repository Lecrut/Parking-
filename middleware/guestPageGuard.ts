export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  const { user } = storeToRefs(auth)

  if (user.value) {
    if (user.value.role === 'user')
      return navigateTo('/client')

    else if (user.value.role === 'admin')
      return navigateTo('/administration')
  }
})
