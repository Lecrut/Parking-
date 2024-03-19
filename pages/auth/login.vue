<script setup lang="ts">
import NavBar from '~/components/navBars/navBar.vue'

const auth = useAuthStore()

const email = ref('')
const password = ref('')

async function logIn() {
  if (!email.value || !password.value)
    return alert('Wszystkie pola muszą być wypełnione')

  await auth.loginUser(email.value, password.value)

  if (auth.user?.role === 'user')
    navigateTo('/client')
  else if (auth.user?.role === 'admin')
    navigateTo('/administration')
  else
    alert('Niepoprawne dane logowania')
}
</script>

<template>
  <NavBar />

  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto my-10 px-4"
    elevation="4"
    max-width="1100"
    rounded
  >
    <v-row justify="center">
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 py-3">
          <div class="text-h5 my-2">
            Logowanie
          </div>

          <form class="w-75 my-2">
            <v-text-field
              v-model="email"
              label="Adres Email"
              placeholder="example@mail.com"
              type="email"
            />

            <v-text-field
              v-model="password"
              label="Hasło"
              type="password"
            />

            <v-row class="justify-center my-1">
              <v-btn class="mx-2 mb-2" @click="logIn">
                Zaloguj
              </v-btn>

              <v-btn to="/auth/reset" class="mx-2 mb-2">
                Zapomniałeś hasła?
              </v-btn>
            </v-row>
          </form>

          <p class="my-5">
            Nie masz jeszcze konta?
          </p>

          <v-btn to="/auth/register">
            Zarejestruj się
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 pa-6">
          <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="300"
            aspect-ratio="4/3"
            cover
            src="/login.jpeg"
          />
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>
