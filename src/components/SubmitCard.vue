<template>
  <n-card class="px-8" :bordered="false">
    <div class="flex flex-row">
      <TextInput placeholder="Enter your prompt" @submit="submitPrompt" />
    </div>
    <div class="flex justify-center mt-2">
      <n-radio-group
        v-model:value="selectedSystemMessage"
        name="radiogroup"
        @update:value="setSelectedSystemMessage"
      >
        <n-space>
          <n-radio
            v-for="assistant in systemMessages"
            :key="assistant.value"
            :value="assistant.value"
            :label="assistant.label"
          />
        </n-space>
      </n-radio-group>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { useSystemMessages } from '@/stores/systemMessages'
import { NCard, NRadioGroup, NRadio, NSpace } from 'naive-ui'
import { storeToRefs } from 'pinia'
import TextInput from './TextInput.vue'

const emit = defineEmits(['submit'])

const submitPrompt = () => {
  emit('submit')
}

const systemMessagesStore = useSystemMessages()
const { selectedSystemMessage, systemMessages } = storeToRefs(systemMessagesStore)
const setSelectedSystemMessage = (value: string) => {
  systemMessagesStore.setSelectedSystemMessage(value)
}
</script>
