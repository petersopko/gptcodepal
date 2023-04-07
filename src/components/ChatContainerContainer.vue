<template>
  <div>
    <div class="flex-shrink-0">
      <n-card class="w-full" content-style="display: flex; justify-content: space-between;">
        <!-- Left LayoutToggle -->
        <LayoutToggle
          :is-side-bar-visible="isLeftSideBarVisible"
          :window-width="windowWidth"
          :side-bar-width="sideBarWidth"
          :mobile-mode="isMobile"
          :position="'left'"
          @toggle-sidebar="toggleLeftSidebar"
        />
        <!-- Right LayoutToggle -->
        <LayoutToggle
          v-if="!isMobile"
          :is-side-bar-visible="isRightSideBarVisible"
          :window-width="windowWidth"
          :side-bar-width="sideBarWidth"
          :mobile-mode="isMobile"
          :position="'right'"
          @toggle-sidebar="toggleRightSidebar"
        />
      </n-card>
    </div>
    <div
      ref="chatContainerMessages"
      class="chat-container-messages flex-grow overflow-y-auto relative"
    >
      <div
        v-if="!chatStore.activeChat || chatStore.activeChat.messages.length === 0"
        class="robot-face"
      ></div>

      <ChatContainer />
      <div ref="messagesEnd" style="height: 0"></div>
    </div>
    <div class="chat-container-submit flex-shrink-0">
      <SubmitCard
        :responseTokens="responseTokens"
        :promptTokens="promptTokens"
        @submit="submitPrompt"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

import LayoutToggle from '../components/LayoutToggle.vue'
import ChatContainer from '../components/Chat/ChatContainer.vue'
import SubmitCard from '../components/SubmitCard.vue'
import { NCard } from 'naive-ui'
import { useChatStore } from '../stores/chatStore'
import { useStatesStore } from '../stores/statesStore'
import { useSubmit } from '../composables/useSubmit'
import { useWindowResize } from '../composables/useWindowResize'

const chatStore = useChatStore()
const statesStore = useStatesStore()
const { windowWidth, isMobile } = useWindowResize()
const { submitPrompt, promptTokens, responseTokens } = useSubmit()

const sideBarWidth = ref(0)
const isLeftSideBarVisible = statesStore.getLeftSideBarVisible()
const isRightSideBarVisible = statesStore.getRightSideBarVisible()

const chatContainerMessages = ref<HTMLElement | null>(null)
const messagesEnd = ref<HTMLElement | null>(null)
const autoScrollEnabled = ref(true)

const toggleLeftSidebar = () => {
  statesStore.setExclusiveSideBarVisible(!isLeftSideBarVisible.value, isRightSideBarVisible.value)
}

const toggleRightSidebar = () => {
  statesStore.setExclusiveSideBarVisible(isLeftSideBarVisible.value, !isRightSideBarVisible.value)
}

const handleScroll = () => {
  if (chatContainerMessages.value) {
    const { scrollTop, scrollHeight, clientHeight } = chatContainerMessages.value
    const bottomTolerance = 30

    if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
      autoScrollEnabled.value = false
    } else {
      autoScrollEnabled.value = true
    }
  }
}

watch(
  () => [chatStore.allChats, chatStore.activeChatIndex],
  () => {
    if (messagesEnd.value && chatContainerMessages.value && autoScrollEnabled.value) {
      messagesEnd.value.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      })
    }
  },
  { deep: true }
)

onMounted(() => {
  if (chatContainerMessages.value) {
    chatContainerMessages.value.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (chatContainerMessages.value) {
    chatContainerMessages.value.removeEventListener('scroll', handleScroll)
  }
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
