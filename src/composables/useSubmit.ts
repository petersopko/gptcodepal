// useSubmit.ts
import { ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useSettingsStore } from '@/stores/settingsStore'
import { useStatesStore } from '@/stores/statesStore'
import { useInputStore } from '@/stores/inputStore'
import { useChatStore } from '@/stores/chatStore'
import { useSystemMessages } from '@/stores/systemMessages'
import { storeToRefs } from 'pinia'
import { useNotification } from 'naive-ui'

interface Message {
  role: string
  content: string
}

export function useSubmit() {
  const settingsStore = useSettingsStore()
  const statesStore = useStatesStore()
  const inputStore = useInputStore()
  const chatStore = useChatStore()
  const systemMessages = useSystemMessages()
  const notification = useNotification()

  const { selectedSystemMessage } = storeToRefs(systemMessages)

  const response = ref('')
  const promptTokens = ref(0)
  const responseTokens = ref(0)
  const controller = new AbortController()

  async function submitPrompt() {
    statesStore.updateLoading(true)
    console.log('submitting prompt', controller)

    if (!inputStore.inputStorage.inputText) return
    handleNewChat()
    handleNewMessage()

    try {
      const promptMessages: Message[] = [...chatStore.allChats[chatStore.activeChatIndex].messages]
      const result = await postCompletionStream(
        promptMessages,
        0.7,
        settingsStore.apiKey,
        handlePartialResponse
      )
      handleFinalResponse(result)
    } catch (error) {
      handleError(error as AxiosError)
    }
  }

  function handleNewChat() {
    if (!chatStore.activeChat) {
      chatStore.addChat()
      chatStore.updateActiveChat(chatStore.totalChats - 1)
    }
  }

  function handleNewMessage() {
    if (chatStore.activeChat.messages.length === 0) {
      chatStore.addMessage(chatStore.activeChatIndex, 'system', selectedSystemMessage.value.value)
    }

    const storedFormattedInput = inputStore.inputStorage.formattedInput
    chatStore.addMessage(chatStore.activeChatIndex, 'user', storedFormattedInput)
    inputStore.updateInputText('')
    inputStore.resetAttachedToPrompt()
    chatStore.addMessage(chatStore.activeChatIndex, 'assistant', 'Thinking...')
  }

  function handlePartialResponse(responseText: string) {
    const lines = responseText.split('\n').map((line) => line.trim())
    const streamedResponse: string[] = []

    for (const line of lines) {
      if (line === 'data: [DONE]') {
        continue
      } else if (line.startsWith('data: ')) {
        const validJson = line.replace('data: ', '')

        try {
          const partialResponse = JSON.parse(validJson)

          if (partialResponse.choices?.[0]?.delta?.content) {
            const content = partialResponse.choices[0].delta.content
            const segments = content.split(/(`+)/g)
            streamedResponse.push(...segments)
          }
        } catch (error) {
          console.error('Invalid JSON:', validJson)
        }
      }
    }

    const combinedResponse: string[] = []
    let backtickCount = 0

    for (let i = 0; i < streamedResponse.length; i++) {
      if (streamedResponse[i].startsWith('`')) {
        backtickCount += streamedResponse[i].length
      } else {
        if (backtickCount > 0) {
          combinedResponse.push('`'.repeat(backtickCount))
          backtickCount = 0
        }
        combinedResponse.push(streamedResponse[i])
      }
    }

    if (backtickCount > 0) {
      combinedResponse.push('`'.repeat(backtickCount))
    }

    response.value = combinedResponse.join('')
    chatStore.updateStreamedMessage(chatStore.activeChatIndex, response.value)
  }

  function handleFinalResponse(result: any) {
    statesStore.updateLoading(false)
    console.log('RESULT', result)
  }

  function handleError(error: AxiosError<any>) {
    statesStore.updateLoading(false)
    const errorMessage = 'An error occurred while fetching the response.'
    console.log('ERROR', error)
    chatStore.handleErrorRequest()
    showErrorNotification(errorMessage)
  }

  function showErrorNotification(error: string) {
    notification.error({
      title: 'Error',
      content: error || 'An error occurred while fetching the response.',
      duration: 5000
    })
  }

  function cancelOngoingRequest() {
    console.log('this fires')
    console.log('controller', controller)
    if (!controller) return
    controller.abort() // Remove the console.log() wrapping this line
  }

  async function postCompletionStream(
    messages: Message[],
    temperature: number,
    apiKey: string,
    onProgress: (progressEvent: string) => void
  ) {
    const url = 'https://api.openai.com/v1/chat/completions'

    try {
      const result = await axios.post(
        url,
        {
          model: 'gpt-4',
          messages,
          temperature,
          stream: true
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`
          },

          onDownloadProgress: (progressEvent) => {
            onProgress(progressEvent.event.currentTarget.responseText)
          },
          signal: controller.signal
        }
      )
      return result
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Canceled:', error.message)
      } else {
        throw error
      }
    }
  }

  return {
    submitPrompt,
    cancelOngoingRequest,
    response,
    promptTokens,
    responseTokens
  }
}
