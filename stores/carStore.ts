import type { Ref } from 'vue'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ICar } from '~/models/Car'

export const useCarStore = defineStore('car', () => {
  const cars: Ref<ICar[]> = ref([])
  const addCarError: Ref<boolean> = ref(false)
  const searchedCars: Ref<ICar | null> = ref(null)

  function reset() {
    cars.value = []
    addCarError.value = false
    searchedCars.value = null
  }

  async function checkIfCarExists(registrationNum: string): Promise<ICar | null> {
    const cars = await $fetch(`/api/cars?registrationNum=${registrationNum}`)

    if ((cars as unknown[]).length === 1)
      return cars[0] as ICar
    else
      return null
  }

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

  async function updateCar(car: ICar) {
    addCarError.value = false
    try {
      return await $fetch('/api/cars', {
        method: 'PUT',
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

  async function fetchCarByID(carID: string | object) {
    try {
      const cars = await $fetch(`/api/cars?_id=${carID}`)
      const carTable = cars as ICar[]
      searchedCars.value = carTable[0]
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    cars,
    addCarError,
    searchedCars,
    addCar,
    fetchCarByID,
    fetchCarsForUser,
    checkIfCarExists,
    updateCar,
    reset,
  }
})
