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

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NRadioGroup, NRadio } from 'naive-ui'
import TextInput from './TextInput.vue'
import { usePromptStore } from '../stores/promptStore'

const { promptSelection, promptContexts, updatePromptSelection } = usePromptStore()
const emit = defineEmits(['submit'])
const selectedRadio = ref(promptSelection.value)

const submitPrompt = () => {
  emit('submit')
}
</script>
