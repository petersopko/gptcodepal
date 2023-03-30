import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Chat } from '@/types'

function getInitialChats() {
  const parsedChats = JSON.parse(localStorage.getItem('chatStore') || '[]')
  const initialChat = [{ messages: [], tokenCount: 0 }]
  return parsedChats.length > 0 ? parsedChats : initialChat
}

export const useChatStore = defineStore('chatStore', () => {
  const allChats = ref<Chat[]>(getInitialChats())

  const activeChatIndex = ref<number>(0)
  const activeChat = computed<Chat>(() => {
    return allChats.value[activeChatIndex.value]
  })
  const totalChats = computed(() => {
    return allChats.value.length
  })

  function updateActiveChat(index: number): void {
    activeChatIndex.value = index
  }

  function addChat(): void {
    allChats.value.push({ messages: [], tokenCount: 0 })
    updateActiveChat(allChats.value.length - 1)
    localStorage.setItem('chatStore', JSON.stringify(allChats.value))
  }

  function addMessage(activeChatIndex: number, role: string, content: string): void {
    if (!role) {
      allChats.value.splice(activeChatIndex, 0, {
        messages: [],
        tokenCount: 0
      })
    } else {
      allChats.value[activeChatIndex].messages.push({
        role,
        content
      })
    }
    localStorage.setItem('chatStore', JSON.stringify(allChats.value))
  }

  function updateTokenCount(activeChatIndex: number, tokens: number): void {
    allChats.value[activeChatIndex].tokenCount += tokens
    localStorage.setItem('chatStore', JSON.stringify(allChats.value))
  }

  function deleteChat(index: number): void {
    allChats.value.splice(index, 1)
    activeChatIndex.value = Math.min(activeChatIndex.value, allChats.value.length - 1)
    localStorage.setItem('chatStore', JSON.stringify(allChats.value))
    updateActiveChat(activeChatIndex.value)
  }

  function updateStreamedMessage(activeChatIndex: number, content: string): void {
    const lastElementIndex = allChats.value[activeChatIndex].messages.length - 1
    allChats.value[activeChatIndex].messages[lastElementIndex].content = content
    localStorage.setItem('chatStore', JSON.stringify(allChats.value))
  }

  function handleErrorRequest(): void {
    // delete last two messages
    allChats.value[activeChatIndex.value].messages.splice(-2, 2)
    localStorage.setItem('chatStore', JSON.stringify(allChats.value))
  }

  function resetMessages(): void {
    allChats.value = []
  }

  return {
    allChats,
    activeChat,
    activeChatIndex,
    totalChats,
    addMessage,
    addChat,
    deleteChat,
    resetMessages,
    updateActiveChat,
    updateTokenCount,
    updateStreamedMessage,
    handleErrorRequest
  }
})
