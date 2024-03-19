<script setup lang="ts">
import NavBar from '~/components/navBars/navBar.vue'

const auth = useAuthStore()

const email = ref('')
const name = ref('')
const password1 = ref('')
const password2 = ref('')
const rules = ref(false)

function verifyEmail() {
  return email.value.includes('@')
}

function verifyPassword() {
  if (password1.value !== password2.value)
    return false

  return password1.value.length > 5
}

async function registerUser() {
  if (email.value.length < 5 || name.value.length < 3 || password1.value.length < 6)
    return alert('Wszystkie pola muszą być wypełnione')

  if (!verifyEmail())
    return alert('Niepoprawny email')

  if (!verifyPassword())
    return alert('Hasło musi mieć minimum 6 znaków i być takie same')

  if (!rules.value)
    return alert('Musisz zaakceptować regulamin')

  await auth.registerUser({
    email: email.value,
    name: name.value,
    password: password1.value,
    role: 'user',
  })
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
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 pa-6">
          <v-img
            class="mx-auto my-5 elevation-5"
            rounded="xl"
            :width="300"
            aspect-ratio="4/3"
            cover
            src="/register.jpeg"
          />
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <div class="d-flex flex-column align-center justify-center h-100 mx-2 py-4">
          <div class="text-h5 my-2">
            Rejestracja
          </div>

          <form class="w-75 my-2">
            <v-text-field
              v-model="email"
              label="Adres Email"
              placeholder="example@mail.com"
              type="email"
            />

            <v-text-field
              v-model="name"
              label="Nazwa użytkownika"
              type="text"
            />

            <v-text-field
              v-model="password1"
              label="Hasło"
              type="password"
            />

            <v-text-field
              v-model="password2"
              label="Powtórz hasło"
              type="password"
            />

            <v-checkbox
              v-model="rules"
              label="Akceptuję regulamin"
            />

            <v-btn @click="registerUser">
              Zarejestruj się
            </v-btn>
          </form>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>
