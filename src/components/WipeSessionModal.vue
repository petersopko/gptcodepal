<template>
  <n-button hoverable ghost size="large" @click="showModal = true"> 💥 </n-button>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    title="WARNING"
    :content="warningMessage"
    positive-text="Submit"
    :positiveButtonProps="{ type: 'default' }"
    negative-text="Cancel"
    @positive-click="submitCallback"
    @negative-click="cancelCallback"
  />
</template>

<script setup lang="ts">
import { NButton, NModal } from 'naive-ui'
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { useStatsStore } from '../stores/statsStore'

const message = useMessage()
const statsStore = useStatsStore() // Access the store
const showModal = ref(false)
const warningMessage =
  'All of the data in this session, including API key will be wiped. Are you sure you want to continue?'

const cancelCallback = () => {
  message.success('Cancel')
}

const submitCallback = () => {
  statsStore.$reset()
  localStorage.clear()
  showModal.value = false
  message.success('Submit')
}
</script>
