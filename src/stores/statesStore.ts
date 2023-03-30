import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStatesStore = defineStore('statesStore', () => {
  const loading = ref<boolean>(false)

  const isLoading = computed<boolean>(() => loading.value)

  const updateLoading = (newLoading: boolean): void => {
    console.log('newLoading:', newLoading)
    loading.value = newLoading
  }

  return {
    isLoading,
    updateLoading
  }
})
