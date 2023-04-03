<template>
  <div
    v-show="isRightSideBarVisible"
    class="right-side-bar flex flex-col w-full sm:w-2/5 lg:w-2/6 border-2 border-gray-200 max-h-screen"
    :style="`border-color: ${themeVar.primaryColor};${
      windowWidth >= 640 ? 'border-left: none !important;' : ''
    }`"
  >
    <div
      v-show="mobileMode"
      class="right-side-bar-add-chat flex flex-row justify-between mt-4 mx-4"
    >
      <LayoutToggle
        v-if="mobileMode"
        :is-side-bar-visible="isRightSideBarVisible"
        :window-width="windowWidth"
        :side-bar-width="sideBarWidth"
        :mobile-mode="mobileMode"
        :position="'right'"
        @toggle-sidebar="toggleRightSidebar"
      />
    </div>
    <div class="overflow-y-auto relative">
      <CodeInputList />
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeInputList from '@/components/CodeInputList.vue'
import LayoutToggle from '../components/LayoutToggle.vue'
import { useThemeVars } from 'naive-ui'
import { useStatesStore } from '../stores/statesStore'
import { ref, computed } from 'vue'
import { useWindowResize } from '../composables/useWindowResize'

const themeVar = useThemeVars()
const statesStore = useStatesStore()

const windowWidth = useWindowResize()
const sideBarWidth = ref(0)
const isRightSideBarVisible = statesStore.getRightSideBarVisible()
const mobileMode = computed(() => windowWidth.value <= 640)

const toggleRightSidebar = () => {
  statesStore.setRightSideBarVisible(!isRightSideBarVisible.value)
}
</script>
