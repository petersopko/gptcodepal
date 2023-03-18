<template>
    <div class="flex justify-between">
        <div class="relative w-full max-w-md">
            <n-input id="api-key-input" v-model:value="apiKey" type="password" show-password-on="mousedown"
                placeholder="API Key" />
        </div>
        <n-button class="mx-2" @click="saveApiKey">
            Save API Key
        </n-button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { NInput } from "naive-ui";
import { NButton } from "naive-ui";

const emit = defineEmits(["save-api-key"]);

const apiKey = ref("");

onMounted(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
        apiKey.value = savedApiKey;
    }
});

const saveApiKey = () => {
    localStorage.setItem("openai_api_key", apiKey.value);
    emit("save-api-key", apiKey.value);
};
</script>
