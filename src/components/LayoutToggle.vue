<template>
  <div>
    <n-button :focusable="false" @click="toggle">
      <template #icon>
        <n-icon v-if="isSideBarVisible">
          <arrow-back-sharp v-if="position === 'left'" />
          <arrow-forward-sharp v-else />
        </n-icon>
        <n-icon v-else>
          <arrow-forward-sharp v-if="position === 'left'" />
          <arrow-back-sharp v-else />
        </n-icon>
      </template>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { ArrowBackSharp, ArrowForwardSharp } from '@vicons/ionicons5'

defineProps<{
  isSideBarVisible: boolean
  windowWidth: number
  sideBarWidth: number
  mobileMode: boolean
  position: 'left' | 'right'
}>()

const emit = defineEmits(['toggle-sidebar'])

const toggle = () => {
  emit('toggle-sidebar')
}
</script>
