<template>
  <n-button class="min-w-full" :bordered="false" @click="openModal"> Settings </n-button>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    :bordered="false"
    size="huge"
  >
    <div class="flex justify-center items-center space-x-10">
      <n-statistic label="Prompt tokens" :value="promptTokensTotal" />
      <n-statistic label="Completion tokens" :value="completionTokensTotal" />
      <n-statistic label="# of Prompts 🤖" :value="totalPromptsSent" />
      <n-statistic label="Approx. 💲" :value="`$${totalMoneySpent}`" />
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton, NModal, NStatistic } from 'naive-ui'
import { useStatsStore } from '../stores/statsStore'

const statsStore = useStatsStore()

const promptTokensTotal = computed(() => statsStore.promptTokensTotal)
const completionTokensTotal = computed(() => statsStore.completionTokensTotal)
const totalPromptsSent = computed(() => statsStore.totalPromptsSent)
const totalMoneySpent = computed(() => {
  const promptCost = (statsStore.promptTokensTotal / 1000) * 0.03
  const completionCost = (statsStore.completionTokensTotal / 1000) * 0.06
  return (promptCost + completionCost).toFixed(2)
})

const bodyStyle = {
  width: '600px'
}

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}
</script>
