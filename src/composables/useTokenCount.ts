import { ref, watch, computed } from 'vue'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { useChatStore } from '../stores/chatStore'
import { useInputStore } from '../stores/inputStore'
// import { usePromptStore } from '../stores/promptStore'

// interface CodeInput {
//   name: string
//   code: string
// }

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

export function countTokens(text: string): number {
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

  const updateTokenEstimate = (newTokenEstimate: number): void => {
    tokenEstimate.value = newTokenEstimate
  }

  const resetTokenEstimate = (): void => {
    tokenEstimate.value = 0
  }

  const updateTokenCount = (): void => {
    // const text = `${inputText.value}${codeInputs.value
    //   .map((chunk: CodeInput) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
    //   .join('')}`

    const activeChatTokens = updateTokenEstimate(
      countTokens(inputText.value) + countTokens(JSON.stringify(chatStore.activeChat))
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
