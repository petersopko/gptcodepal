import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useWindowResize() {
  const windowWidth = ref(window.innerWidth)

  const handleResize = () => {
    windowWidth.value = window.innerWidth
  }

  const isMid = computed(() => windowWidth.value < 768)
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  const isMobile = computed(() => windowWidth.value < 640)

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { windowWidth, isMid, isMobile }
}
