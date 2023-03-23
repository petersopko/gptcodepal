<template>
    <div class="flex justify-center">
        <div class="relative w-full max-w-md">
            <n-input id="api-key-input" v-model:value="apiKeyStore.apiKey" type="password" show-password-on="mousedown"
                placeholder="API Key" />
        </div>
        <n-button class="mx-2" @click="saveApiKey">
            <n-icon size="20"><save-outline /></n-icon>
        </n-button>
    </div>
</template>

<script setup>
import { NCard, NInput, NButton, NIcon } from "naive-ui";
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
