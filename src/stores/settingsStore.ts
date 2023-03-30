import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSettingsStore = defineStore('settingsStore', () => {
  const apiKey = ref<string>(localStorage.getItem('openai_api_key') || '')
  const maxTokens = ref<number>(parseInt(localStorage.getItem('max_tokens') || '0'))

  function saveApiKey(key: string): void {
    localStorage.setItem('openai_api_key', key)
    apiKey.value = key
  }

  function saveMaxTokens(value: number): void {
    localStorage.setItem('max_tokens', value.toString())
    maxTokens.value = value
  }

  function $reset(): void {
    apiKey.value = ''
    localStorage.removeItem('openai_api_key')
    maxTokens.value = 0
    localStorage.removeItem('max_tokens')
  }

  return {
    apiKey,
    maxTokens,
    saveApiKey,
    saveMaxTokens,
    $reset
  }
})
