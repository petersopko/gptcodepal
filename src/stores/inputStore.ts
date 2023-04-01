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
    console.log('updateInputText', inputStorage.value)
  }

  const addCodeInput = (): void => {
    inputStorage.value.codeInputs.push({ label: 'New Code Input', value: '' })
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
    console.log('addCodeInput', inputStorage.value)
  }

  const updateCodeInput = (codeInput: CodeInput, index: number): void => {
    inputStorage.value.codeInputs[index] = codeInput
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
    console.log('updateCodeInput', inputStorage.value)
  }

  const addCodeInputFromFile = (file: any, content: any): void => {
    const codeInput: CodeInput = { label: file.name, value: content }
    inputStorage.value.codeInputs.push(codeInput)
    localStorage.setItem('inputStore', JSON.stringify(inputStorage.value))
    console.log('addCodeInputFromFile', inputStorage.value)
  }

  return {
    inputStorage,
    updateInputText,
    updateCodeInput,
    addCodeInputFromFile,
    addCodeInput
  }
})
