import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IUser } from '~/models/User'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<IUser | null> = ref(null)
  const loginError: Ref<boolean> = ref(false)
  const registerError: Ref<boolean> = ref(false)
  function setUser(newUser: IUser) {
    user.value = newUser
  }

  async function logout() {
    user.value = null
    await $fetch('/api/logout', {
      method: 'POST',
    })

    useCarStore().reset()
    useTicketStore().reset()
  }

  async function registerUser(user: IUser) {
    registerError.value = false
    try {
      await $fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(user),
      })
    }
    catch (e) {
      registerError.value = true
    }
  }

  async function loginUser(email: string, password: string) {
    loginError.value = false
    try {
      const res = await $fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }) as IUser

      res ? setUser(res) : loginError.value = true
    }
    catch (e) {
      loginError.value = true
    }
  }

  return {
    user,
    loginError,
    registerError,
    setUser,
    logout,
    registerUser,
    loginUser,
  }
})
