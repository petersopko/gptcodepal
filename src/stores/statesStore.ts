import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useWindowResize } from '@/composables/useWindowResize'

export const useStatesStore = defineStore('statesStore', () => {
  const loading = ref<boolean>(false)

  const { isMid } = useWindowResize()
  const storedLeftSideBarVisible = localStorage.getItem('leftSideBarVisible')
  const storedRightSideBarVisible = localStorage.getItem('rightSideBarVisible')

  const leftSideBarVisible = ref<boolean>(
    isMid
      ? storedLeftSideBarVisible !== null
        ? JSON.parse(storedLeftSideBarVisible)
        : false
      : true
  )
  const rightSideBarVisible = ref<boolean>(
    isMid
      ? storedRightSideBarVisible !== null
        ? JSON.parse(storedRightSideBarVisible)
        : false
      : true
  )

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
  const setExclusiveSideBarVisible = (leftVisible: boolean, rightVisible: boolean): void => {
    if (isMid) {
      leftSideBarVisible.value = leftVisible
      rightSideBarVisible.value = rightVisible
      localStorage.setItem('leftSideBarVisible', JSON.stringify(leftVisible))
      localStorage.setItem('rightSideBarVisible', JSON.stringify(rightVisible))
    }
  }

  return {
    isLoading,
    updateLoading,
    leftSideBarVisible,
    rightSideBarVisible,
    setLeftSideBarVisible,
    setRightSideBarVisible,
    getLeftSideBarVisible,
    getRightSideBarVisible,
    setExclusiveSideBarVisible
  }
})
