<script setup lang="ts">
import NavBar from '~/components/navBars/navBar.vue'
import formValidation from "~/composable/formValidation";
import {emailRule, passwordRule, requiredRule} from "~/composable/rules";

definePageMeta({
  middleware: ['guest-page-guard'],
})

useHead({
  title: "Logowanie - Parking+"
})

const auth = useAuthStore()
const {user, loginError} = storeToRefs(auth)

const email = ref('')
const password = ref('')

const showPassword = ref(false)

const { form, valid, isValid } = formValidation()

async function logIn() {
  if (await isValid()) {
    await auth.loginUser(email.value, password.value)

    if (user.value?.role === 'user')
      navigateTo('/client')
    else if (user.value?.role === 'admin')
      navigateTo('/administration')
  }
}

onMounted(() => loginError.value = false)
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

          <v-form
              ref="form"
              @submit.prevent="logIn"
              class="w-75 my-2"
              v-model="valid"
          >
            <v-text-field
              v-model="email"
              label="Adres Email"
              placeholder="example@mail.com"
              type="email"
              @keyup.enter="logIn"
              :rules="[requiredRule(), emailRule()]"
            />

            <v-text-field
              v-model="password"
              label="Hasło"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
              @keyup.enter="logIn"
              :rules="[requiredRule(), passwordRule()]"
            />

            <v-row class="justify-center my-1">
              <v-btn class="mx-2 mb-2" @click="logIn">
                Zaloguj
              </v-btn>

<!--              <v-btn to="/auth/reset" class="mx-2 mb-2">-->
<!--                Zapomniałeś hasła?-->
<!--              </v-btn>-->
            </v-row>
          </v-form>

          <p class="my-5">
            Nie masz jeszcze konta?
          </p>

          <v-btn to="/auth/register">
            Zarejestruj się
          </v-btn>

          <v-alert
              v-if="loginError"
              color="error"
              variant="tonal"
              class="my-4"
          >
            Niepoprawne dane logowania
          </v-alert>
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
