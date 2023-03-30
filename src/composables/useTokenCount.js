import { ref, watch, computed } from 'vue'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { useChatStore } from '../stores/chatStore'
import { useInputStore } from '../stores/inputStore'
import { usePromptStore } from '../stores/promptStore'

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

export function countTokens(text) {
  const encoded = tokenizer.encode(text)
  return encoded.bpe.length
}

export default function useTokenCount() {
  const chatStore = useChatStore()
  const inputStore = useInputStore()
  const activeChatTokenCount = computed(() => chatStore.activeChat?.tokenCount)
  const tokenEstimate = ref(0)

  const inputText = computed(() => inputStore.inputStorage.inputText)
  const codeInputs = computed(() => inputStore.inputStorage.codeInputs)

  const updateTokenEstimate = (newTokenEstimate) => {
    tokenEstimate.value = newTokenEstimate
  }

  const resetTokenEstimate = () => {
    tokenEstimate.value = 0
  }

  const updateTokenCount = () => {
    const text = `${inputText.value}${codeInputs.value
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join('')}`

    // TODO: we'll see if this ever works
    // const activeChatTokens = activeChatTokenCount.value || 0;
    const activeChatTokens = updateTokenEstimate(
      countTokens(text) + countTokens(JSON.stringify(chatStore.activeChat))
    )
  }

  watch([inputText, codeInputs, chatStore.activeChat], updateTokenCount, {
    immediate: true
  })

  return {
    tokenEstimate,
    resetTokenEstimate
  }
}
