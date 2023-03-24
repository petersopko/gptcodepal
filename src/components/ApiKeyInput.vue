<template>
  <div class="flex justify-center">
    <n-button hoverable ghost size="large" @click="showModal = true">
      💥
    </n-button>
    <n-input
      id="api-key-input"
      v-model:value="apiKeyStore.apiKey"
      type="password"
      show-password-on="mousedown"
      placeholder="API Key"
    />
    <n-button @click="saveApiKey">
      <n-icon size="20"><save-outline /></n-icon>
    </n-button>
  </div>
</template>

<script setup>
import { NCard, NMenu, NInput, NButton, NIcon } from "naive-ui";
import { useSettingsStore } from "../store/settingsStore.js";
import { useMessage } from "naive-ui";
import { SaveOutline } from "@vicons/ionicons5";

const message = useMessage();
const apiKeyStore = useSettingsStore();
const saveApiKey = () => {
  message.success("API Key saved!");
  apiKeyStore.saveApiKey(apiKeyStore.apiKey);
};
</script>
