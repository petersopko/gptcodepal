import { defineStore } from 'pinia'
import { ref } from 'vue'

interface InputStorage {
  inputText: string
  codeInputs: CodeInput[]
}

interface CodeInput {
  label: string
  value: string
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
    inputStorage.value.codeInputs.push({ label: 'New Code Input', value: '' })
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }

  const updateCodeInput = (codeInput: CodeInput, index: number): void => {
    inputStorage.value.codeInputs[index] = codeInput
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
  }
  const addCodeInputFromFile = (label: any, value: any): void => {
    const codeInput: CodeInput = { label, value }
    inputStorage.value.codeInputs.push(codeInput)
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
    deleteCodeInput
  }
})
