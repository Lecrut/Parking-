import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICar } from '~/models/Car'

export const useCarStore = defineStore('car', () => {
  const cars: Ref<ICar[]> = ref([])
  const addCarError: Ref<boolean> = ref(false)

  async function addCar(car: ICar) {
    addCarError.value = false
    try {
      return await $fetch('/api/cars', {
        method: 'POST',
        body: JSON.stringify(car),
      })
    }
    catch (e) {
      addCarError.value = true
    }
  }

  async function fetchCarsForUser(userId: string) {
    const userCars = await $fetch(`/api/cars?userId=${userId}`)
    cars.value = userCars as ICar[]
  }

  return {
    cars,
    addCarError,
    addCar,
    fetchCarsForUser,
  }
})
