<template>
  <div class="flex items-stretch space-x-4 justify-center">
    <n-input
      id="api-key-input"
      v-model:value="apiKeyStore.apiKey"
      type="password"
      show-password-on="mousedown"
      placeholder="API Key"
      class="flex items-center"
    />
    <n-button @click="saveApiKey" class="flex items-center">
      <n-icon><save-outline /></n-icon>
    </n-button>
    <n-button @click="showModal = true">
      <n-icon><Close /></n-icon>
    </n-button>
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
  </div>
</template>

<script setup>
import { NModal, NInput, NButton, NIcon } from "naive-ui";
import { useSettingsStore } from "../store/settingsStore.js";
import { useStatsStore } from "../store/statsStore";
import { useMessage } from "naive-ui";
import { SaveOutline, Close } from "@vicons/ionicons5";
import WipeSessionModal from "./WipeSessionModal.vue";
import { ref } from "vue";

const message = useMessage();
const apiKeyStore = useSettingsStore();
const saveApiKey = () => {
  message.success("API Key saved!");
  apiKeyStore.saveApiKey(apiKeyStore.apiKey);
};
const statsStore = useStatsStore(); // Access the store
const showModal = ref(false);
const warningMessage =
  "All of the data in this session, including API key will be wiped. Are you sure you want to continue?";

const cancelCallback = () => {
  message.success("Cancel");
};

const submitCallback = () => {
  statsStore.$reset();
  tabsStore.$reset();
  localStorage.clear();
  showModal.value = false;
  message.success("Submit");
};
</script>
