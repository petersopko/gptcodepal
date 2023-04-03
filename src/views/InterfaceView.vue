<template>
  <div
    class="whole-screen min-h-screen max-h-screen flex flex-row justify-center xl:min-w-screen xl:mx-auto"
  >
    <LeftSideBar />
    <div
      v-show="
        (!isLeftSideBarVisible && !isRightSideBarVisible && windowWidth <= 640) || windowWidth > 640
      "
      class="chat-container min-h-screen flex flex-col w-full sm:w-3/5 lg:w-4/6 border-2"
      :style="`border-color: ${themeVar.primaryColor}; ${
        (!isLeftSideBarVisible || !isRightSideBarVisible) && windowWidth > 600 ? 'width: 100%;' : ''
      }`"
    >
      <div class="chat-container-menu flex-shrink-0">
        <n-card class="w-full" content-style="display: flex; justify-content: space-between;">
          <!-- Left LayoutToggle -->
          <LayoutToggle
            v-if="!(mobileMode && isLeftSideBarVisible)"
            :is-side-bar-visible="isLeftSideBarVisible"
            :window-width="windowWidth"
            :side-bar-width="sideBarWidth"
            :mobile-mode="mobileMode"
            :position="'left'"
            @toggle-sidebar="toggleLeftSidebar"
          />
          <!-- Right LayoutToggle -->
          <LayoutToggle
            v-if="!(mobileMode && isRightSideBarVisible)"
            :is-side-bar-visible="isRightSideBarVisible"
            :window-width="windowWidth"
            :side-bar-width="sideBarWidth"
            :mobile-mode="mobileMode"
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
          v-if="
            (chatStore.activeChat &&
              chatStore.activeChat.messages &&
              chatStore.activeChat.messages.length === 0) ||
            !chatStore.activeChat
          "
          class="robot-face"
        ></div>

        <ChatContainer />
      </div>

      <div class="chat-container-submit flex-shrink-0">
        <SubmitCard
          :responseTokens="responseTokens"
          :promptTokens="promptTokens"
          @submit="submitPrompt"
        />
      </div>
    </div>
    <RightSideBar />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { NCard, useThemeVars } from 'naive-ui'
import ChatContainer from '../components/Chat/ChatContainer.vue'
import SubmitCard from '../components/SubmitCard.vue'
import LayoutToggle from '../components/LayoutToggle.vue'
import LeftSideBar from '../components/LeftSideBar.vue'
import RightSideBar from '../components/RightSideBar.vue'
import { useSubmit } from '../composables/useSubmit'
import { useWindowResize } from '../composables/useWindowResize'
import { useChatStore } from '../stores/chatStore'
import { useStatesStore } from '../stores/statesStore'

const themeVar = useThemeVars()
const chatStore = useChatStore()
const statesStore = useStatesStore()
const windowWidth = useWindowResize()

const sideBarWidth = ref(0)
const isLeftSideBarVisible = statesStore.getLeftSideBarVisible()
const isRightSideBarVisible = statesStore.getRightSideBarVisible()

const mobileMode = computed(() => windowWidth.value <= 640)
const chatContainerMessages = ref<HTMLElement | null>(null)

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainerMessages.value) {
      const scrollHeight = chatContainerMessages.value.scrollHeight
      const clientHeight = chatContainerMessages.value.clientHeight
      chatContainerMessages.value.scrollTop = scrollHeight - clientHeight
    }
  })
}

const toggleLeftSidebar = () => {
  statesStore.setLeftSideBarVisible(!isLeftSideBarVisible.value)
}

const toggleRightSidebar = () => {
  statesStore.setRightSideBarVisible(!isRightSideBarVisible.value)
}

const { submitPrompt, promptTokens, responseTokens } = useSubmit()

watch(
  () => chatStore.activeChat?.messages,
  () => {
    scrollToBottom()
  },
  { immediate: true }
)

watch(
  () => chatStore.activeChatIndex,
  () => {
    scrollToBottom()
  }
)

onMounted(() => {
  chatStore.updateActiveChat(chatStore.activeChatIndex)
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
