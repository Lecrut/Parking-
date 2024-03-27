export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  const { user } = storeToRefs(auth)

  if (!user.value || user.value?.role !== 'user') {
    if (user.value && user.value.role === 'admin')
      return navigateTo('/administration', { redirectCode: 500 })

    return navigateTo('/', { redirectCode: 500 })
  }
})
