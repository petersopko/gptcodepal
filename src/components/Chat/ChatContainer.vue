<template>
  <n-scrollbar>
    <div class="relative min-h-screen">
      <div v-if="activeChatMessages">
        <div v-for="message in activeChatMessages">
          <n-card :class="`${message.role}-message`">
            <ChatMessage :response="message.content" />
          </n-card>
        </div>
      </div>
    </div>
  </n-scrollbar>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { NCard, NScrollbar } from 'naive-ui'
import ChatMessage from './ChatMessage.vue'
import { useChatStore } from '../../stores/chatStore'
import { useStatesStore } from '../../stores/statesStore'
import PageHeader from '../PageHeader.vue'

const chatStore = useChatStore()

const activeChatMessages = ref([])

watch(
  () => chatStore.activeChat,
  (newValue) => {
    activeChatMessages.value = newValue?.messages
  },
  { immediate: true }
)
</script>
