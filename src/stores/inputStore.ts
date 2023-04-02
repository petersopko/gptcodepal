import { defineStore } from 'pinia'
import { ref } from 'vue'

interface InputStorage {
  inputText: string
  codeInputs: CodeInput[]
}

interface CodeInput {
  label: string
  value: string
  attachedToPrompt: boolean
}

export const useInputStore = defineStore('inputStore', () => {
  const inputStorage = ref<InputStorage>(
    JSON.parse(localStorage.getItem('inputStore') || '{ "inputText": "", "codeInputs": [] }')
  )

  const updateInputText = (inputText: string): void => {
    inputStorage.value.inputText = inputText
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }

  const addCodeInput = (): void => {
    inputStorage.value.codeInputs.push({
      label: 'New Code Input',
      value: '',
      attachedToPrompt: false
    })
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }

  const updateCodeInput = (codeInput: CodeInput, index: number): void => {
    inputStorage.value.codeInputs[index] = codeInput
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }
  const addCodeInputFromFile = (label: any, value: any): void => {
    const codeInput: CodeInput = { label, value, attachedToPrompt: false }
    inputStorage.value.codeInputs.push(codeInput)
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }
  const updateAttachedToPrompt = (index: number, attached: boolean): void => {
    inputStorage.value.codeInputs[index].attachedToPrompt = attached
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }

  const deleteCodeInput = (index: number): void => {
    inputStorage.value.codeInputs.splice(index, 1)
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }

  return {
    inputStorage,
    updateInputText,
    updateCodeInput,
    addCodeInputFromFile,
    addCodeInput,
    updateAttachedToPrompt,
    deleteCodeInput
  }
})
