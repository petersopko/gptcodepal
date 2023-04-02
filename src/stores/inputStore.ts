import { defineStore } from 'pinia'
import { ref } from 'vue'

interface InputStorage {
  inputText: string
  codeInputs: CodeInput[]
  formattedInput: string
}

interface CodeInput {
  label: string
  value: string
  attachedToPrompt: boolean
}

export const useInputStore = defineStore('inputStore', () => {
  const inputStorage = ref<InputStorage>(
    JSON.parse(
      localStorage.getItem('inputStore') ||
        '{ "inputText": "", "codeInputs": [], "formattedInput": "" }'
    )
  )

  const updateFormattedInput = (): void => {
    const attachedCodeInputs = inputStorage.value.codeInputs
      .filter((codeInput) => codeInput.attachedToPrompt)
      .map((codeInput) => `${codeInput.label}\n\`\`\`${codeInput.value}\`\`\``)
      .join('\n')

    inputStorage.value.formattedInput = attachedCodeInputs
      ? `${inputStorage.value.inputText}\n\n${attachedCodeInputs}`
      : inputStorage.value.inputText

    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }

  const updateInputText = (inputText: string): void => {
    inputStorage.value.inputText = inputText
    updateFormattedInput() // Call the function here
  }

  const updateCodeInput = (codeInput: CodeInput, index: number): void => {
    inputStorage.value.codeInputs[index] = codeInput
    updateFormattedInput() // Call the function here
  }

  const addCodeInputFromFile = (label: any, value: any): void => {
    const codeInput: CodeInput = { label, value, attachedToPrompt: false }
    inputStorage.value.codeInputs.push(codeInput)
    updateFormattedInput() // Call the function here
  }

  const addCodeInput = (): void => {
    inputStorage.value.codeInputs.push({
      label: 'New Code Input',
      value: '',
      attachedToPrompt: false
    })
    updateFormattedInput() // Call the function here
  }

  const updateAttachedToPrompt = (index: number, attached: boolean): void => {
    inputStorage.value.codeInputs[index].attachedToPrompt = attached
    updateFormattedInput() // Call the function here
  }

  const deleteCodeInput = (index: number): void => {
    inputStorage.value.codeInputs.splice(index, 1)
    updateFormattedInput() // Call the function here
  }
  const resetAttachedToPrompt = (): void => {
    inputStorage.value.codeInputs.forEach((codeInput) => {
      codeInput.attachedToPrompt = false
    })
    updateFormattedInput()
  }

  return {
    inputStorage,
    updateInputText,
    updateCodeInput,
    addCodeInputFromFile,
    addCodeInput,
    updateAttachedToPrompt,
    deleteCodeInput,
    resetAttachedToPrompt
  }
})
