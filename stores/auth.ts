import type { Ref } from 'vue'
import { ref } from 'vue'
import type { IUser } from '~/models/User'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<IUser | null> = ref(null)

  function setUser(newUser: IUser) {
    user.value = newUser
  }

  function logout() {
    user.value = null
  }

  async function registerUser(user: IUser) {
    $fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(user),
    })
  }

  return {
    user,
    setUser,
    logout,
    registerUser,
  }
})
