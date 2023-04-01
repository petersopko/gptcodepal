import { ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useSettingsStore } from '../stores/settingsStore'
import { useStatesStore } from '../stores/statesStore'
import { useNotification } from 'naive-ui'
import { useInputStore } from '../stores/inputStore'
import { useChatStore } from '../stores/chatStore'
import { useSystemMessages } from '@/stores/systemMessages'
import { postCompletionStream } from '../utils/apiService'
import { storeToRefs } from 'pinia'

interface Message {
  role: string
  content: string
}

export default function useSubmit() {
  const settingsStore = useSettingsStore()
  const statesStore = useStatesStore()
  const inputStore = useInputStore()
  const response = ref('')
  const promptTokens = ref(0)
  const responseTokens = ref(0)
  const chatStore = useChatStore()
  const systemMessages = useSystemMessages()
  const { selectedSystemMessage } = storeToRefs(systemMessages)
  const cancelTokenSource = axios.CancelToken.source()

  async function submitPrompt() {
    statesStore.updateLoading(true)
    if (!inputStore.inputStorage.inputText) return

    // If there is no active chat
    if (!chatStore.activeChat) {
      chatStore.addChat()
      chatStore.updateActiveChat(chatStore.totalChats - 1)
    }

    if (chatStore.activeChat.messages.length === 0) {
      chatStore.addMessage(chatStore.activeChatIndex, 'system', selectedSystemMessage.value.value)
    }
    chatStore.addMessage(chatStore.activeChatIndex, 'user', inputStore.inputStorage.inputText)
    inputStore.updateInputText('')
    const promptMessages: Message[] = [...chatStore.allChats[chatStore.activeChatIndex].messages]
    chatStore.addMessage(chatStore.activeChatIndex, 'assistant', 'Thinking...')
    try {
      const result = await postCompletionStream(
        promptMessages,
        0.7,
        settingsStore.apiKey,
        handlePartialResponse,
        cancelTokenSource
      )
      console.log('RESULT', result)
      handleFinalResponse(result)
    } catch (error) {
      handleError(error as AxiosError)
    }
  }

  const notification = useNotification()

  function showErrorNotification(error: string) {
    notification.error({
      title: 'Error',
      content: error || 'An error occurred while fetching the response.',
      duration: 5000
    })
  }

  function handlePartialResponse(responseText: string) {
    // Split the responseText by newline
    const lines = responseText.split('\n').map((line) => line.trim())
    const streamedResponse: string[] = []
    // Process each line as a separate JSON object
    for (const line of lines) {
      if (line === 'data: [DONE]') {
        // Ignore the [DONE] string
        continue
      } else if (line.startsWith('data: ')) {
        const validJson = line.replace('data: ', '')

        // Check if the line is a valid JSON object before parsing
        try {
          const partialResponse = JSON.parse(validJson)

          // Check if the partialResponse contains a delta with content
          if (
            partialResponse.choices &&
            partialResponse.choices[0] &&
            partialResponse.choices[0].delta &&
            partialResponse.choices[0].delta.content
          ) {
            const content = partialResponse.choices[0].delta.content
            const segments = content.split(/(`+)/g)
            streamedResponse.push(...segments)
          }
        } catch (error) {
          console.error('Invalid JSON:', validJson)
        }
      }
    }

    // Combine backticks into a single string
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
    console.log('Final response:', response.value)
    statesStore.updateLoading(false)
    console.log('RESULT', result)
  }
  function handleError(error: AxiosError<any>) {
    statesStore.updateLoading(false)

    const errorMessage = 'An error occurred while fetching the response.'

    // if (axios.isCancel(error)) {
    //   errorMessage = 'Request canceled by user.'
    // } else if (error.response) {
    //   errorMessage = `Error ${error.response.status}: ${error.response.statusText}`
    // } else if (error.request) {
    //   errorMessage = 'No response received from the server.'
    // } else {
    //   errorMessage = `Error: ${error.message}`
    // }
    console.log('ERROR', error)
    chatStore.handleErrorRequest()
    showErrorNotification(errorMessage)
  }

  function cancelOngoingRequest() {
    cancelTokenSource.cancel('Request canceled by user.')
  }

  return {
    submitPrompt,
    cancelOngoingRequest,
    response,
    promptTokens,
    responseTokens
  }
}
