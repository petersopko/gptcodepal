<template>
  <n-dropdown trigger="hover" placement="bottom-start" :options="options" @select="handleSelect">
    <n-button>{{ sysMsgStore.selectedSystemMessage.label }}</n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NDropdown, NButton } from 'naive-ui'
import { useSystemMessages } from '@/stores/systemMessages'

const sysMsgStore = useSystemMessages()

const options = computed(() => {
  return sysMsgStore.systemMessages.map((message) => ({
    label: message.label,
    key: sysMsgStore.systemMessages.indexOf(message)
  }))
})

const handleSelect = (key: number) => {
  console.log(key)
  sysMsgStore.setSelectedSystemMessage(key)
}
</script>
