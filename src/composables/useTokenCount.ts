import { ref, watch, computed } from 'vue'
import GPT3Tokenizer from 'gpt3-tokenizer'
import { useChatStore } from '../stores/chatStore'
import { useInputStore } from '../stores/inputStore'
import { useSystemMessages } from '@/stores/systemMessages'

const tokenizer = new GPT3Tokenizer({ type: 'gpt3' })

export function countTokens(text: string): number {
  const encoded = tokenizer.encode(text)
  return encoded.bpe.length
}

export default function useTokenCount() {
  const chatStore = useChatStore()
  const inputStore = useInputStore()
  const systemMessages = useSystemMessages()
  const selectedSystemMessage = computed(() => systemMessages.selectedSystemMessage)
  const activeChatTokenCount = ref(0)
  const inputText = computed(() => inputStore.inputStorage.inputText)
  const codeInputs = computed(() => inputStore.inputStorage.codeInputs)

  const updateTokenCount = (): void => {
    // Check if chatStore.activeChat exists and has messages
    const hasActiveChatMessages = chatStore.activeChat && chatStore.activeChat.messages.length > 0

    let messagesWithInput: any[] = []

    if (!hasActiveChatMessages) {
      messagesWithInput = [
        {
          role: 'system',
          content: selectedSystemMessage.value
        },
        {
          role: 'assistant',
          content: inputText.value
        }
      ]
    } else {
      messagesWithInput = [
        ...chatStore.activeChat.messages,
        {
          role: 'assistant',
          content: inputText.value
        }
      ]
    }
    const tokenCount = messagesWithInput.reduce((acc, msg) => {
      return acc + countTokens(msg.role) + countTokens(msg.content)
    }, 0)
    activeChatTokenCount.value = tokenCount
  }

  watch([inputText, codeInputs, chatStore, selectedSystemMessage], updateTokenCount, {
    immediate: true
  })

  return {
    activeChatTokenCount
  }
}
