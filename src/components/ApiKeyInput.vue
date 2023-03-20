<template>
    <n-card>
        <div class="flex justify-between">
            <div class="relative w-full max-w-md">
                <n-input id="api-key-input" v-model:value="apiKeyStore.apiKey" type="password" show-password-on="mousedown"
                    placeholder="API Key" />
            </div>
            <n-button class="mx-2" @click="saveApiKey">
                Save API Key
            </n-button>
        </div>
    </n-card>
</template>

<script setup>
import { NCard, NInput, NButton } from "naive-ui";
import { useApiKeyStore } from "../../store/apiKeyStore.js";
import { useMessage } from "naive-ui";

const message = useMessage();

const apiKeyStore = useApiKeyStore();

const saveApiKey = () => {
    message.success("API Key saved!");
    apiKeyStore.saveApiKey(apiKeyStore.apiKey);
};
</script>
