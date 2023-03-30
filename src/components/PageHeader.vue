<template>
  <div></div>
</template>
<script setup>
import { NSpace, NGradientText, NCard } from 'naive-ui'
import { onMounted, computed } from 'vue'
import { useStatsStore } from '../stores/statsStore'

const store = useStatsStore()
onMounted(() => {
  const storedData = JSON.parse(localStorage.getItem('statsStore')) || {}
  store.promptTokensTotal = storedData.promptTokensTotal || 0
  store.completionTokensTotal = storedData.completionTokensTotal || 0
  store.totalPromptsSent = storedData.totalPromptsSent || 0
})

const totalMoneySpent = computed(() => {
  const promptCost = (store.promptTokensTotal / 1000) * 0.03
  const completionCost = (store.completionTokensTotal / 1000) * 0.06
  return (promptCost + completionCost).toFixed(2)
})
</script>
