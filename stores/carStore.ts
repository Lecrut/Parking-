import type { Ref } from 'vue'
import { ref } from 'vue'
import type { ICar } from '~/models/Car'

export const useCarStore = defineStore('car', () => {
  const cars: Ref<ICar[]> = ref([])

  async function addCar(car: ICar) {
    await $fetch('/api/cars', {
      method: 'POST',
      body: JSON.stringify(car),
    })
  }

  return {
    cars,
    addCar,
  }
})
