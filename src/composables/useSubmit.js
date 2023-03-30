import { ref } from 'vue'
import axios from 'axios'
import { useStatsStore } from '../stores/statsStore'
import { useSettingsStore } from '../stores/settingsStore'
import { useStatesStore } from '../stores/statesStore'
import { useNotification } from 'naive-ui'
import { useInputStore } from '../stores/inputStore'
import { useChatStore } from '../stores/chatStore'
import { usePromptStore } from '../stores/promptStore'
import { postCompletionStream } from '../utils/apiService'

export default function useSubmit() {
  const statsStore = useStatsStore()
  const settingsStore = useSettingsStore()
  const statesStore = useStatesStore()
  const inputStore = useInputStore()
  const response = ref('')
  const promptTokens = ref(0)
  const responseTokens = ref(0)
  const chatStore = useChatStore()
  const promptStorage = usePromptStore()
  const cancelTokenSource = axios.CancelToken.source()

  function formatInputText() {
    const formattedCodeInputs = inputStore.inputStorage.codeInputs
      .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
      .join('')
    if (chatStore.allChats.length === 0) {
      chatStore.addChat()
    }
    if (chatStore.allChats[chatStore.activeChatIndex].messages !== 0) {
      return `${inputStore.inputStorage.inputText}${formattedCodeInputs}`
    } else {
      return `${promptStorage.promptSelection}${inputStore.inputStorage.inputText}${formattedCodeInputs}`
    }
  }
  function countTokens(promptTokens, completionTokens) {
    chatStore.updateTokenCount(chatStore.activeChatIndex, promptTokens + completionTokens)
  }
  async function submitPrompt() {
    statesStore.updateLoading(true)
    if (!inputStore.inputStorage.inputText) return

    const formattedPrompt = formatInputText()
    chatStore.addMessage(chatStore.activeChatIndex, 'user', formattedPrompt)
    inputStore.updateInputText('')
    const promptMessages = chatStore.allChats[chatStore.activeChatIndex].messages
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
      handleError(error)
    }
  }

  const notification = useNotification()

  function showErrorNotification(error) {
    notification.error({
      title: 'Error',
      content: error || 'An error occurred while fetching the response.',
      duration: 5000
    })
  }

  function handlePartialResponse(responseText) {
    // Split the responseText by newline
    const lines = responseText.split('\n').map((line) => line.trim())
    const streamedResponse = []
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
    const combinedResponse = []
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

  function handleFinalResponse(result) {
    console.log('Final response:', response.value)
    statesStore.updateLoading(false)
    console.log('RESULT', result)

    // if (response.value) {
    //   chatStore.updateStreamedMessage(
    //     chatStore.activeChatIndex,
    //     result.choices[0].delta.content
    //   );
    // } else {
    //   response.value = "An error occurred while fetching the final response.";
    //   showErrorNotification(response.value);
    //   chatStore.updateStreamedMessage(
    //     chatStore.activeChatIndex,
    //     response.value
    //   );
    // }
  }

  function handleError(error) {
    statesStore.updateLoading(false)
    console.log('test')

    let errorMessage = 'An error occurred while fetching the response.'

    if (axios.isCancel(error)) {
      errorMessage = 'Request canceled by user.'
    } else if (error.response) {
      errorMessage = `Error ${error.response.status}: ${error.response.statusText}`
    } else if (error.request) {
      errorMessage = 'No response received from the server.'
    } else {
      errorMessage = `Error: ${error.response.data.error.message}`
    }
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
