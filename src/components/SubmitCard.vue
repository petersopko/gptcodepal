<template>
  <n-card class="px-8" :bordered="false">
    <div class="flex flex-row">
      <TextInput placeholder="Enter your prompt" @submit="submitPrompt" />
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'
import TextInput from './TextInput.vue'

const emit = defineEmits(['submit'])

const submitPrompt = () => {
  emit('submit')
}
</script>
