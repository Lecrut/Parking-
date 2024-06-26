<script setup lang="ts">
import NavBar from '~/components/navBars/navBar.vue'
import formValidation from "~/composable/formValidation";
import {emailRule, lengthRule, lengthRuleShort, passwordRule, requiredRule} from "~/composable/rules";

definePageMeta({
  middleware: ['guest-page-guard'],
})

useHead({
  title: "Rejestracja - Parking+"
})

const auth = useAuthStore()

const { form, valid, isValid } = formValidation()

const {registerError} = storeToRefs(auth)

const email = ref('')
const name = ref('')
const password1 = ref('')
const password2 = ref('')
const rules = ref(false)

const showPasswordOne = ref(false)
const showPasswordTwo = ref(false)

function verifyPassword() {
  return password1.value === password2.value
}

async function registerUser() {
  if (await isValid() && verifyPassword()) {
    await auth.registerUser({
      email: email.value,
      name: name.value,
      password: password1.value,
      role: 'user',
    })
    if (!registerError.value) {
      await auth.loginUser(email.value, password1.value)
      navigateTo('/client/profile')
    }
  }
  else {
    registerError.value = true
  }
}

onMounted(() => registerError.value = false)

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

          <v-form
              class="w-75 my-2"
              v-model="valid"
              ref="form"
              @submit.prevent="registerUser"
          >
            <v-text-field
              v-model="email"
              label="Adres Email"
              placeholder="example@mail.com"
              type="email"
              @keyup.enter="registerUser"
              :rules="[requiredRule(), emailRule()]"
            />

            <v-text-field
              v-model="name"
              label="Nazwa użytkownika"
              type="text"
              @keyup.enter="registerUser"
              :rules="[requiredRule(), lengthRuleShort(), lengthRule()]"
            />

            <v-text-field
              v-model="password1"
              label="Hasło"
              @keyup.enter="registerUser"
              :append-inner-icon="showPasswordOne ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPasswordOne ? 'text' : 'password'"
              @click:append-inner="showPasswordOne = !showPasswordOne"
              :rules="[requiredRule(), passwordRule()]"
            />

            <v-text-field
              v-model="password2"
              label="Powtórz hasło"
              @keyup.enter="registerUser"
              :append-inner-icon="showPasswordTwo ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPasswordTwo ? 'text' : 'password'"
              @click:append-inner="showPasswordTwo = !showPasswordTwo"
              :rules="[requiredRule(), passwordRule()]"
            />

            <v-checkbox
              v-model="rules"
              label="Akceptuję regulamin"
              :rules="[requiredRule()]"
            />

            <v-btn @click="registerUser">
              Zarejestruj się
            </v-btn>
          </v-form>

          <v-alert
              v-if="registerError"
              color="error"
              variant="tonal"
              class="my-4"
          >
            Niepoprawne dane rejestracji
          </v-alert>
        </div>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style scoped>

</style>
