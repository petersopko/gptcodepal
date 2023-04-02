import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useStatesStore = defineStore('statesStore', () => {
  const loading = ref<boolean>(false)
  const leftSideBarVisible = ref<boolean>(false)
  const rightSideBarVisible = ref<boolean>(false)

  const setLeftSideBarVisible = (visible: boolean): void => {
    leftSideBarVisible.value = visible
    localStorage.setItem('leftSideBarVisible', JSON.stringify(visible))
  }

  const setRightSideBarVisible = (visible: boolean): void => {
    rightSideBarVisible.value = visible
    localStorage.setItem('rightSideBarVisible', JSON.stringify(visible))
  }

  const getLeftSideBarVisible = () => leftSideBarVisible
  const getRightSideBarVisible = () => rightSideBarVisible

  const isLoading = computed<boolean>(() => loading.value)

  const updateLoading = (newLoading: boolean): void => {
    loading.value = newLoading
  }

  return {
    isLoading,
    updateLoading,
    leftSideBarVisible,
    rightSideBarVisible,
    setLeftSideBarVisible,
    setRightSideBarVisible,
    getLeftSideBarVisible,
    getRightSideBarVisible
  }
})
