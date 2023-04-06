<template>
  <div class="whole-screen min-h-screen max-h-screen min-w-full flex flex-row justify-center">
    <LeftSideBar
      v-if="!isMobile || isLeftSideBarVisible"
      class="flex flex-col border-2"
      :class="leftSideBarWidth"
      :style="`border-color: ${themeVar.primaryColor};${
        windowWidth >= 640 ? 'border-right: none !important;' : ''
      }`"
    />
    <ChatContainerContainer
      v-if="!(isMobile && isLeftSideBarVisible)"
      class="flex flex-col border-2 w-full"
      :class="chatContainerWidth"
      :style="`border-color: ${themeVar.primaryColor}; `"
    />
    <RightSideBar
      v-if="!isMobile"
      class="flex flex-col border-2"
      :class="rightSideBarWidth"
      :style="`border-color: ${themeVar.primaryColor};${
        windowWidth >= 640 ? 'border-left: none !important;' : ''
      }`"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useThemeVars } from 'naive-ui'

import LeftSideBar from '../components/LeftSideBar.vue'
import RightSideBar from '../components/RightSideBar.vue'
import ChatContainerContainer from '../components/ChatContainerContainer.vue'
import { useWindowResize } from '../composables/useWindowResize'
import { useChatStore } from '../stores/chatStore'
import { useStatesStore } from '../stores/statesStore'

const themeVar = useThemeVars()
const chatStore = useChatStore()
const statesStore = useStatesStore()
const { windowWidth, isMobile } = useWindowResize()

const isLeftSideBarVisible = statesStore.getLeftSideBarVisible()
const isRightSideBarVisible = statesStore.getRightSideBarVisible()

const leftSideBarWidth = computed(() => {
  if (isMobile.value) return 'w-full'
  return 'sm:w-3/12'
})

const chatContainerWidth = computed(() => {
  if (isMobile.value) return 'w-full'
  if (!isLeftSideBarVisible.value && !isRightSideBarVisible.value) return 'sm:w-12/12'
  if (!isLeftSideBarVisible.value || !isRightSideBarVisible.value) return 'sm:w-9/12'
  return 'sm:w-6/12'
})

const rightSideBarWidth = computed(() => {
  if (isMobile.value) return 'w-full'
  return 'sm:w-3/12'
})

onMounted(() => {
  chatStore.updateActiveChat(chatStore.activeChatIndex)
})
</script>
