<template>
  <n-input
    placeholder="Ask and you shall receive 🤖"
    type="textarea"
    :autosize="{ minRows: 1, maxRows: 10 }"
    :value="inputTextComputed"
    @input="updateInputText($event)"
    @keydown.enter.prevent="submitPrompt"
  >
    <template #suffix>
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-gradient-text>
            {{ `${activeChatTokenCount ?? 0}` }}
          </n-gradient-text>
        </template>
        Estimated tokens needed to submit
      </n-tooltip>

      <n-button
        :bordered="false"
        :disabled="!inputTextComputed || statesStore.loading"
        class="pr-0 pl-2"
        @click="submitPrompt"
      >
        🚀
      </n-button>
    </template>
  </n-input>
</template>

<script setup lang="ts">
import { NInput, NButton, NGradientText, NTooltip } from 'naive-ui'
import { computed } from 'vue'
import { useInputStore } from '../stores/inputStore'
import useTokenCount from '../composables/useTokenCount'
import { useStatesStore } from '../stores/statesStore'

const emit = defineEmits(['submit'])

const { inputStorage, updateInputText } = useInputStore()
const { activeChatTokenCount } = useTokenCount()
const statesStore = useStatesStore()

const inputTextComputed = computed(() => inputStorage.inputText)

const submitPrompt = () => {
  if (statesStore.loading) return
  emit('submit')
}
</script>
