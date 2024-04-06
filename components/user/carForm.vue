<script setup lang="ts">
import { useCarStore } from '~/stores/carStore'
import formValidation from "~/composable/formValidation";
import {lengthRuleShort, requiredRule} from "~/composable/rules";

const props = defineProps < {
  isShow: boolean
}>()

const emit = defineEmits<{
  (e: 'onClose'): void
  (e: 'showSnackbar'): void
}>()

const carStore = useCarStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)
const { addCarError } = storeToRefs(carStore)

const { form, valid, isValid } = formValidation()

const carBrand = ref('')
const carModel = ref('')
const carRegistrationNumber = ref('')

const { isShow } = toRefs(props)
const isShowRef = ref<boolean>()

function resetState() {
  addCarError.value = false
  carModel.value = ''
  carBrand.value = ''
  carRegistrationNumber.value = ''
}

function close() {
  resetState()
  emit('onClose')
}

async function addCar() {
  if (await isValid() && user.value?._id) {
    await carStore.addCar({
      brand: carBrand.value.trim(),
      model: carModel.value.trim(),
      registrationNum: carRegistrationNumber.value.toUpperCase().split(' ').join(''),
      owner: user?.value._id,
    })
    if (!addCarError.value) {
      resetState()
      emit('showSnackbar')
      emit('onClose')
    }
  }
  else {
    addCarError.value = true
  }
}

watch(isShow, () => isShowRef.value = isShow.value)
</script>

<template>
  <v-dialog
    max-width="800px"
    :model-value="isShowRef"
    scrollable
    @update:model-value="close"
  >
    <v-card>
      <v-card-title>
        Dodaj samochód
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row justify="center">
            <v-col cols="12" sm="12" md="6">
              <div class="d-flex flex-column align-center justify-center h-100">
                <v-img
                    class="mx-auto elevation-5"
                    rounded="xl"
                    :width="300"
                    aspect-ratio="4/3"
                    cover
                    src="/carForm.jpeg"
                />
              </div>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <div class="text-center grey d-flex flex-column align-center justify-center h-100 w-100">
                <v-form
                    v-model="valid"
                    ref="form"
                    class="w-100"
                    @submit.prevent="addCar"
                >
                  <v-text-field
                      v-model="carBrand"
                      label="Marka samochodu"
                      type="text"
                      :rules="[requiredRule()]"
                  />

                  <v-text-field
                      v-model="carModel"
                      label="Model samochodu"
                      type="text"
                      :rules="[requiredRule()]"
                  />

                  <v-text-field
                      v-model="carRegistrationNumber"
                      label="Numer rejestracyjny"
                      type="text"
                      :rules="[requiredRule(), lengthRuleShort()]"
                  />
                </v-form>

                <v-alert
                    v-if="addCarError"
                    color="error"
                    variant="tonal"
                    class="my-4"
                >
                  Niepoprawne dane pojazdu
                </v-alert>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-end">
        <v-btn color="error" @click="close">
          Zamknij
        </v-btn>

        <v-btn @click="addCar">
          Dodaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
