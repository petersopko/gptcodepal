import { defineStore } from 'pinia'
import { ref } from 'vue'

interface StoredStats {
  promptTokensTotal: number
  completionTokensTotal: number
  totalPromptsSent: number
}

export const useStatsStore = defineStore('main', () => {
  const storedStatsString = localStorage.getItem('statsStore')
  const storedStats: StoredStats | null = storedStatsString ? JSON.parse(storedStatsString) : null

  const promptTokensTotal = ref<number>(storedStats ? storedStats.promptTokensTotal : 0)
  const completionTokensTotal = ref<number>(storedStats ? storedStats.completionTokensTotal : 0)
  const totalPromptsSent = ref<number>(storedStats ? storedStats.totalPromptsSent : 0)

  function incrementPromptTokens(tokens: number): void {
    promptTokensTotal.value += tokens
  }

  function incrementCompletionTokens(tokens: number): void {
    completionTokensTotal.value += tokens
  }

  function incrementTotalPromptsSent(): void {
    totalPromptsSent.value++
  }

  function updateStats(promptTokensCount: number, completionTokensCount: number): void {
    incrementPromptTokens(promptTokensCount)
    incrementCompletionTokens(completionTokensCount)
    incrementTotalPromptsSent()

    const simplifiedStatsStore: StoredStats = {
      promptTokensTotal: promptTokensTotal.value,
      completionTokensTotal: completionTokensTotal.value,
      totalPromptsSent: totalPromptsSent.value
    }

    localStorage.setItem('statsStore', JSON.stringify(simplifiedStatsStore))
  }

  function $reset(): void {
    promptTokensTotal.value = 0
    completionTokensTotal.value = 0
    totalPromptsSent.value = 0
  }

  return {
    promptTokensTotal,
    completionTokensTotal,
    totalPromptsSent,
    incrementPromptTokens,
    incrementCompletionTokens,
    incrementTotalPromptsSent,
    updateStats,
    $reset
  }
})
