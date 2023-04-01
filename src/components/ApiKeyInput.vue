<template>
  <div
    class="flex items-center"
    :style="apiKeyUpdatable ? 'justify-content: space-between' : 'justify-content: center'"
  >
    <div v-if="!apiKeyUpdatable" class="flex items-center">
      <n-icon class="mr-2">
        <KeyOutline />
      </n-icon>
      <button @click="toggleApiKeyUpdate()">OpenAI API Key</button>
    </div>
    <div v-else>
      <input
        id="api-key-input"
        v-model="apiKeyStore.apiKey"
        type="password"
        show-password-on="mousedown"
        style="outline: none; background-color: transparent"
        placeholder="API Key"
        class="flex items-center"
      />
    </div>
    <div v-if="apiKeyUpdatable" class="flex items-center">
      <n-button text style="font-size: 16px" :focusable="false" class="mr-2" @click="saveApiKey()">
        <n-icon>
          <CheckmarkOutline />
        </n-icon>
      </n-button>
      <n-button text style="font-size: 16px" :focusable="false" @click="toggleApiKeyUpdate()">
        <n-icon>
          <CloseOutline />
        </n-icon>
      </n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { useSettingsStore } from '../stores/settingsStore'
import { useMessage } from 'naive-ui'
import { CheckmarkOutline, CloseOutline, KeyOutline } from '@vicons/ionicons5'
import { ref } from 'vue'

const message = useMessage()
const apiKeyUpdatable = ref(false)
const toggleApiKeyUpdate = () => {
  apiKeyUpdatable.value = !apiKeyUpdatable.value
}
const apiKeyStore = useSettingsStore()
const saveApiKey = () => {
  message.success('API Key saved!')
  apiKeyStore.saveApiKey(apiKeyStore.apiKey)
  toggleApiKeyUpdate()
}
</script>
