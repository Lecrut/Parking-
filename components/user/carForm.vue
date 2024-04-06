<script setup lang="ts">
import { useCarStore } from '~/stores/carStore'

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

const carBrand = ref('')
const carModel = ref('')
const carRegistrationNumber = ref('')

const { isShow } = toRefs(props)
const isShowRef = ref<boolean>()

function resetState() {
  carModel.value = ''
  carBrand.value = ''
  carRegistrationNumber.value = ''
}

function close() {
  resetState()
  emit('onClose')
}

async function addCar() {
  if (!carBrand.value || !carModel.value
    || !carRegistrationNumber.value || !user.value?._id)
    return

  await carStore.addCar({
    brand: carBrand.value.trim(),
    model: carModel.value.trim(),
    registrationNum: carRegistrationNumber.value.toUpperCase().split(' ').join(''),
    owner: user?.value._id,
  })
  resetState()
  emit('showSnackbar')
  emit('onClose')
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
        Samochód
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
                <v-form class="w-100">
                  <v-text-field
                      v-model="carBrand"
                      label="Marka samochodu"
                      type="text"
                  />

                  <v-text-field
                      v-model="carModel"
                      label="Model samochodu"
                      type="text"
                  />

                  <v-text-field
                      v-model="carRegistrationNumber"
                      label="Numer rejestracyjny"
                      type="text"
                  />
                </v-form>
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
