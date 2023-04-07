<template>
  <div class="relative min-h-fit" ref="el">
    <div v-if="activeChatMessages">
      <div v-for="message in activeChatMessages" v-bind:key="activeChatMessages.indexOf(message)">
        <n-card v-if="message.role !== 'system'" :class="`${message.role}-message`">
          <ChatMessage :response="message.content" />
        </n-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NCard } from 'naive-ui'
import ChatMessage from './ChatMessage.vue'
import { useChatStore } from '../../stores/chatStore'
import type { Message } from '@/types'

const chatStore = useChatStore()

const activeChatMessages = ref<Message[]>([])

watch(
  () => chatStore.activeChat,
  (newValue) => {
    activeChatMessages.value = newValue?.messages
  },
  { immediate: true }
)
</script>
