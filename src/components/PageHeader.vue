<template>
    <n-page-header subtitle="Your GPT-4 powered coding friend">
        <n-card title="Stats & Settings">
            <n-grid class="mb-2" cols="3">
                <n-gi class="flex justify-center">
                    <n-statistic label="Prompt Tokens 🪙" :value="promptTokensTotal" />
                </n-gi>
                <n-gi class="flex justify-center">
                    <n-statistic label="Completion Tokens 🪙" :value="completionTokensTotal" />
                </n-gi>
                <n-gi class="flex justify-center items-center">
                    <n-statistic label="Prompts Sent 🗣️" :value="totalPromptsSent" />
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
                <n-statistic label="Money Spent 💲" :value="`$${totalMoneySpent}`" class="mr-4" />
                <n-button>Wipe session data 🧹</n-button>
            </n-space>
        </template>
    </n-page-header>
</template>

<script setup>
import { onMounted, computed } from "vue";
import ApiKeyInput from "./ApiKeyInput.vue";
import { useStatsStore } from '../../store/statsStore'
const emit = defineEmits(["save-api-key"]);

const promptTokensTotal = computed(() => store.promptTokensTotal);
const completionTokensTotal = computed(() => store.completionTokensTotal);
const totalPromptsSent = computed(() => store.totalPromptsSent);
const store = useStatsStore();
onMounted(() => {
    const storedData = JSON.parse(localStorage.getItem("statsStore")) || {};
    store.promptTokensTotal = storedData.promptTokensTotal || 0;
    store.completionTokensTotal = storedData.completionTokensTotal || 0;
    store.totalPromptsSent = storedData.totalPromptsSent || 0;
});


const totalMoneySpent = computed(() => {
    const promptCost = (promptTokensTotal.value / 1000) * 0.03;
    const completionCost = (completionTokensTotal.value / 1000) * 0.06;
    return (promptCost + completionCost).toFixed(2);
});

const saveApiKey = (apiKey) => {
    emit("save-api-key", apiKey);
};
</script>
