import { defineStore } from 'pinia'
import { ref } from 'vue'

interface InputStorage {
  inputText: string
  codeInputs: string[]
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

  return {
    inputStorage,
    updateInputText
  }
})
