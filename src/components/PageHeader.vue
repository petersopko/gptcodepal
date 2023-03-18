<template>
    <n-page-header subtitle="Your GPT-4 powered coding friend">
        <n-card>
            <n-grid class="mb-2" cols="3">
                <n-gi class="flex justify-center">
                    <n-statistic label="Tokens 🪙" value="12409" />
                </n-gi>
                <n-gi class="flex justify-center items-center">
                    <n-statistic label="Money 💲 " value="$22" />
                </n-gi>
                <n-gi class="flex justify-center items-center">
                    <n-statistic label="Prompts 🗣️" value="36" />
                </n-gi>
            </n-grid>
            <n-card>
                <n-collapse>
                    <n-collapse-item title="API Key">
                        <ApiKeyInput @save-api-key="saveApiKey" />
                    </n-collapse-item>
                </n-collapse>
            </n-card>
        </n-card>
        <template #title>
            <a href="https://github.com/petersopko/gptcodepal/" style="text-decoration: none; color: inherit">
                GptCodePal
            </a>
        </template>
        <template #header>
            Made with love, Vue.js, NaiveUI and GPT-4 🤝
        </template>
        <template #avatar>
            <n-avatar src="https://image.lexica.art/full_jpg/bac6aa81-cd0f-4da4-8cfa-2a0a5d1680c3" />
        </template>
        <template #extra>
            <n-space>
                <n-button>Wipe session data 🧹</n-button>
            </n-space>
        </template>
    </n-page-header>
</template>

<script setup>
import ApiKeyInput from "./ApiKeyInput.vue";
const emit = defineEmits(["save-api-key"]);

const saveApiKey = (apiKey) => {
    emit("save-api-key", apiKey);
};
</script>
