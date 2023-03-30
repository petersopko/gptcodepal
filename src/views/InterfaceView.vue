<template>
  <div
    class="whole-screen min-h-screen max-h-screen flex flex-row justify-center xl:min-w-screen xl:mx-auto"
  >
    <div
      v-show="isSideBarVisible"
      class="side-bar flex flex-col w-full sm:w-2/5 lg:w-1/5 border-2 border-gray-200"
      :style="`border-color: ${themeVar.primaryColor};${
        windowWidth >= 640 ? 'border-right: none !important;' : ''
      }`"
    >
      <div class="side-bar-add-chat flex flex-row justify-between mt-4 mx-4">
        <SideBarTop :class="{ 'w-4/5': mobileMode }" />
        <LayoutToggle
          v-if="mobileMode"
          :is-side-bar-visible="isSideBarVisible"
          :window-width="windowWidth"
          :side-bar-width="sideBarWidth"
          :mobile-mode="mobileMode"
          @toggle-sidebar="toggleSidebar"
        />
      </div>
      <div class="side-bar-chat-messages flex-grow overflow-y-auto">
        <SideBarChatList />
      </div>
      <div class="side-bar-settings flex-shrink-0">
        <SideBarSettings />
      </div>
    </div>
    <div
      v-show="(!isSideBarVisible && windowWidth <= 640) || windowWidth > 640"
      class="chat-container flex flex-col justify-between w-full sm:w-3/5 lg:w-4/5 border-2"
      :style="`border-color: ${themeVar.primaryColor}; ${
        !isSideBarVisible && windowWidth > 600 ? 'width: 100%;' : ''
      }`"
    >
      <div>
        <n-card class="w-full">
          <LayoutToggle
            v-if="!(mobileMode && isSideBarVisible)"
            :is-side-bar-visible="isSideBarVisible"
            :window-width="windowWidth"
            :side-bar-width="sideBarWidth"
            :mobile-mode="mobileMode"
            @toggle-sidebar="toggleSidebar"
          />
        </n-card>
      </div>
      <div class="chat-messages-container overflow-y-auto relative">
        <div v-if="chatStore.activeChat.messages.length === 0" class="robot-face"></div>
        <ChatContainer />
      </div>

      <div class="chat-submit-card flex-shrink-0 bg-transparent">
        <SubmitCard
          :responseTokens="responseTokens"
          :promptTokens="promptTokens"
          @submit="submitPrompt"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, watch } from 'vue'
import { NCard } from 'naive-ui'
import ChatContainer from '../components/Chat/ChatContainer.vue'
import SideBarChatList from '../components/Sidebar/SideBarChatList.vue'
import SideBarTop from '../components/Sidebar/SideBarTopControls.vue'
import useSubmit from '../composables/useSubmit.js'
import SubmitCard from '../components/SubmitCard.vue'
import SideBarSettings from '../components/Sidebar/SideBarMenu.vue'
import { useChatStore } from '../stores/chatStore'
import { useThemeVars } from 'naive-ui'
import LayoutToggle from '../components/LayoutToggle.vue'

const themeVar = useThemeVars()
const chatStore = useChatStore()
const windowWidth = ref(window.innerWidth)

const sideBarWidth = ref(0)
const isSideBarVisible = ref(false)
const mobileMode = computed(() => windowWidth.value <= 640)

const toggleSidebar = () => {
  isSideBarVisible.value = !isSideBarVisible.value
  updateSideBarWidth()
}

const updateSideBarWidth = () => {
  if (isSideBarVisible.value) {
    if (windowWidth.value >= 640) {
      if (windowWidth.value > 1024) {
        sideBarWidth.value = windowWidth.value * 0.2
      } else {
        sideBarWidth.value = windowWidth.value * (2 / 5)
      }
    }
  }
}

const { submitPrompt, promptTokens, responseTokens } = useSubmit()

const handleResize = () => {
  windowWidth.value = window.innerWidth
}

watch(windowWidth, () => {
  updateSideBarWidth()
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
  chatStore.updateActiveChat(chatStore.activeChatIndex)

  updateSideBarWidth()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
<style scoped>
.robot-face {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  -webkit-mask-image: url('../assets/robot-face.svg');
  mask-image: url('../assets/robot-face.svg');
  z-index: 1;
  background-blend-mode: overlay;
  background-image: linear-gradient(45deg, #63e2b7 25%, #85e9c7 50%, #63e2b7 75%),
    linear-gradient(-45deg, #4bc9aa 25%, #63e2b7 50%, #4bc9aa 75%);
}
</style>
