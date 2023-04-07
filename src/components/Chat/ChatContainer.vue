<template>
  <div class="relative min-h-fit" ref="el">
    <div v-if="activeChatMessages">
      <div v-for="message in activeChatMessages" v-bind:key="activeChatMessages.indexOf(message)">
        <n-card v-if="message.role !== 'system'" :class="`${message.role}-message`">
          <ChatMessage :response="message.content" />
          <div
            v-if="
              activeChatMessages.length - 1 === activeChatMessages.indexOf(message) &&
              statesStore.loading
            "
            class="flex justify-center"
          >
            <n-button class="mt-8">
              Stop Generating
              <n-icon class="ml-2">
                <CheckmarkOutline />
              </n-icon>
            </n-button>
          </div>
        </n-card>
      </div>
      <!-- <div v-if="!isLoading">
        <n-button @click="cancelOngoingRequest">
          <n-icon>
            <ApertureOutline />
          </n-icon>
        </n-button>
      </div> -->
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { NCard, NButton, NIcon } from 'naive-ui'
import ChatMessage from './ChatMessage.vue'
import { useChatStore } from '../../stores/chatStore'
import { useSubmit } from '../../composables/useSubmit'
import { useStatesStore } from '../../stores/statesStore'
import { CheckmarkOutline } from '@vicons/ionicons5'

import type { Message } from '@/types'

const chatStore = useChatStore()
const statesStore = useStatesStore()
const { cancelOngoingRequest } = useSubmit()
const activeChatMessages = ref<Message[]>([])

watch(
  () => chatStore.activeChat,
  (newValue) => {
    activeChatMessages.value = newValue?.messages
  },
  { immediate: true }
)
</script>
