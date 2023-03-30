<template>
  <n-scrollbar>
    <n-card
      v-for="(chat, index) in allChats"
      :key="index"
      @click="updateActiveChat(index)"
      :content-style="{
        'justify-content': 'space-between',
        display: 'flex',
        'align-items': 'center'
      }"
      class="chat-card flex justify-between mx-4 my-4 w-auto"
      size="small"
      :style="{
        'border-color': `${activeChatIndex === index ? `${themeVar.primaryColor}` : 'gray'}`
      }"
    >
      <p class="ml-5">Chat {{ index }}</p>
      <n-button @click="($event) => deleteChat(index, $event)">
        <n-icon>
          <trash-outline />
        </n-icon>
      </n-button>
    </n-card>
  </n-scrollbar>
</template>

<script setup lang="ts">
import { NCard, NButton, NIcon, useThemeVars, NScrollbar } from 'naive-ui'
import { computed } from 'vue'
import { TrashOutline } from '@vicons/ionicons5'
import { useChatStore } from '../../stores/chatStore'

const themeVar = useThemeVars()
const chatStore = useChatStore()

const allChats = computed(() => {
  return chatStore.allChats
})

const activeChatIndex = computed(() => {
  return chatStore.activeChatIndex
})

const updateActiveChat = (index: number) => {
  chatStore.updateActiveChat(index)
}

const deleteChat = (index: number, event: MouseEvent) => {
  event.stopPropagation() // Stop event propagation
  chatStore.deleteChat(index)
}
</script>
<style scoped>
.chat-card {
  cursor: pointer;
}
</style>
