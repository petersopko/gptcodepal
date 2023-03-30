<template>
  <n-button class="min-w-full" :bordered="false" @click="openModal"> Settings </n-button>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    :bordered="false"
    size="huge"
    :segmented="segmented"
  >
    <!-- <template #header-extra> Oops! </template> -->
    <div class="flex justify-center items-center space-x-10">
      <n-statistic label="Prompt tokens" :value="promptTokensTotal" />
      <n-statistic label="Completion tokens" :value="completionTokensTotal" />
      <n-statistic label="# of Prompts 🤖" :value="totalPromptsSent" />
      <n-statistic label="Approx. 💲" :value="`$${totalMoneySpent}`" />
    </div>

    <!-- <template #footer>
      <div class="flex justify-center">
        <n-gradient-text>Max tokens for answer (tooltip here)</n-gradient-text>
      </div>
      <div class="flex justify-center">
        <n-input-number
          placeholder="Max tokens for answer"
          v-model:value="maxTokens"
          clearable
          min="0"
          @update:value="updateMaxTokens"
        />
      </div>
    </template> -->
  </n-modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  NButton,
  NModal,
  NCard,
  NGrid,
  NGi,
  NStatistic,
  NInputNumber,
  NCollapse,
  NCollapseItem,
  NGradientText
} from 'naive-ui'
import { useStatsStore } from '../stores/statsStore'
import { useTabsStore } from '../stores/tabsStore'
import { useSettingsStore } from '../stores/settingsStore'

const settingsStore = useSettingsStore()

const tabsStore = useTabsStore()
const statsStore = useStatsStore()

const promptTokensTotal = computed(() => statsStore.promptTokensTotal)
const completionTokensTotal = computed(() => statsStore.completionTokensTotal)
const totalPromptsSent = computed(() => statsStore.totalPromptsSent)
const totalMoneySpent = computed(() => {
  const promptCost = (statsStore.promptTokensTotal / 1000) * 0.03
  const completionCost = (statsStore.completionTokensTotal / 1000) * 0.06
  return (promptCost + completionCost).toFixed(2)
})

const maxTokens = computed(() => settingsStore.maxTokens)
function updateMaxTokens(value) {
  settingsStore.saveMaxTokens(value)
}

const bodyStyle = {
  width: '600px'
}

const segmented = {
  content: 'soft',
  footer: 'soft'
}

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}
</script>
