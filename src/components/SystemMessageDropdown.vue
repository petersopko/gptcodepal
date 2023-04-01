<template>
  <div class="flex justify-center">
    <n-dropdown trigger="hover" placement="bottom-start" :options="options" @select="handleSelect">
      <n-button> {{ sysMsgStore.selectedSystemMessage.label }} </n-button>
    </n-dropdown>
    <n-tooltip placement="bottom-start" trigger="hover">
      <template #trigger>
        <n-button class="ml-4">
          <n-icon>
            <CogOutline />
          </n-icon>
        </n-button>
      </template>
      Customization coming soon!
    </n-tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NDropdown, NButton, NIcon, NTooltip } from 'naive-ui'
import { useSystemMessages } from '@/stores/systemMessages'
import { CogOutline } from '@vicons/ionicons5'

const sysMsgStore = useSystemMessages()

const options = computed(() => {
  return sysMsgStore.systemMessages.map((message) => ({
    label: message.label,
    key: sysMsgStore.systemMessages.indexOf(message)
  }))
})

const handleSelect = (key: number) => {
  sysMsgStore.setSelectedSystemMessage(key)
}
</script>
