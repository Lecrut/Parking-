<script setup lang="ts">
import { useCarStore } from '~/stores/carStore'

const props = defineProps < {
  isShow: boolean
}>()

const emit = defineEmits<{
  (e: 'onClose'): void
}>()

const carStore = useCarStore()
const authStore = useAuthStore()

const { user } = storeToRefs(authStore)

const carBrand = ref('')
const carModel = ref('')
const carRegistrationNumber = ref('')

const { isShow } = toRefs(props)
const isShowRef = ref<boolean>()

function close() {
  emit('onClose')
}

async function addCar() {
  if (!carBrand.value || !carModel.value
    || !carRegistrationNumber.value || !user.value?._id)
    return

  await carStore.addCar({
    brand: carBrand.value,
    model: carModel.value,
    registrationNum: carRegistrationNumber.value,
    owner: user?.value._id,
  })
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
        <v-form>
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

<style scoped>

</style>
