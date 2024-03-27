export default defineNuxtRouteMiddleware(async () => {
  const auth = useAuthStore()

  const { user } = storeToRefs(auth)

  if (!user.value || user.value?.role !== 'admin') {
    if (user.value && user.value.role === 'user')
      return navigateTo('/client', { redirectCode: 500 })

    return navigateTo('/', { redirectCode: 500 })
  }
})
