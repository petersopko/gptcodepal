<template>
  <n-card class="px-8" :bordered="false">
    <div class="flex flex-row">
      <TextInput placeholder="Enter your prompt" @submit="submitPrompt" />
    </div>
    <div class="flex justify-center mt-2">
      <n-radio-group
        v-model:value="selectedRadio"
        default-value=""
        @update-value="updatePromptSelection($event)"
      >
        <n-radio
          v-for="context in promptContexts"
          :key="context.value"
          :value="context.value"
          :label="context.label"
        >
        </n-radio>
      </n-radio-group>
    </div>
  </n-card>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { NCard, NRadioGroup, NRadio, NGradientText } from 'naive-ui'
import TextInput from './TextInput.vue'
import { usePromptStore } from '../stores/promptStore'
import { useChatStore } from '../stores/chatStore'
import { useInputStore } from '../stores/inputStore'
import useTokenCount from '../composables/useTokenCount'

const { promptSelection, promptContexts, updatePromptSelection } = usePromptStore()
const { activeChat } = useChatStore()
const emit = defineEmits(['submit'])
const selectedRadio = ref(promptSelection.value)

const submitPrompt = () => {
  emit('submit')
}
</script>
