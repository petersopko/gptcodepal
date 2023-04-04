<template>
  <div
    class="whole-screen min-h-screen max-h-screen flex flex-row justify-center xl:min-w-screen xl:mx-auto"
  >
    <LeftSideBar
      class="side-bar flex flex-col w-full sm:w-2/5 lg:w-2/6 border-2 border-gray-200"
      :style="`border-color: ${themeVar.primaryColor};${
        windowWidth >= 640 ? 'border-right: none !important;' : ''
      }`"
    />
    <ChatContainerContainer
      v-show="
        (!isLeftSideBarVisible && !isRightSideBarVisible && windowWidth <= 640) || windowWidth > 640
      "
      class="min-h-screen flex flex-col w-full sm:w-3/5 lg:w-4/6 border-2"
    />
    <RightSideBar
      class="right-side-bar flex flex-col w-full sm:w-2/5 lg:w-2/6 border-2 border-gray-200 max-h-screen"
      :style="`border-color: ${themeVar.primaryColor};${
        windowWidth >= 640 ? 'border-left: none !important;' : ''
      }`"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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
const windowWidth = useWindowResize()

const isLeftSideBarVisible = statesStore.getLeftSideBarVisible()
const isRightSideBarVisible = statesStore.getRightSideBarVisible()

onMounted(() => {
  chatStore.updateActiveChat(chatStore.activeChatIndex)
})
</script>
