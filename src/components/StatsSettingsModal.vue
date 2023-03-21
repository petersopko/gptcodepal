<template>
    <n-button class="header-button-right" ghost type="info" size="large" @click="showModal = true">
        📈⚙️
    </n-button>
    <n-modal v-model:show="showModal">
        <n-card style=" width: 600px" title="Stats & Settings" :bordered="false" size="huge" role="dialog"
            aria-modal="true">
            <n-grid class="mb-2" cols="4">
                <n-gi class="flex justify-center">
                    <n-statistic label="Prompts🪙" :value="promptTokensTotal" />
                </n-gi>
                <n-gi class="flex justify-center">
                    <n-statistic label="Completions🪙" :value="completionTokensTotal" />
                </n-gi>
                <n-gi class="flex justify-center items-center">
                    <n-statistic label="# of Prompts🤖" :value="totalPromptsSent" />
                </n-gi>
                <n-gi class="flex justify-center items-center">
                    <n-statistic label="Money 💲" :value="totalMoneySpent" />
                </n-gi>
            </n-grid>
            <ApiKeyInput />
            <n-gi class="flex justify-center items-center">
                <div>
                    <span>Max Tokens: </span>
                    <n-input-number v-model:value="maxTokens" clearable min="0" @update:value="updateMaxTokens" />
                </div>
            </n-gi>

        </n-card>
    </n-modal>
</template>

<script setup>
import { NButton, NModal, NCard, NGrid, NGi, NStatistic, NInputNumber } from "naive-ui";
import { ref, computed } from "vue";
import ApiKeyInput from "./ApiKeyInput.vue";
import { useStatsStore } from "../store/statsStore";
import { useSettingsStore } from "../store/settingsStore.js";

const settingsStore = useSettingsStore();

function updateMaxTokens(value) {
    settingsStore.saveMaxTokens(value);
}

const store = useStatsStore();
const showModal = ref(false);
const maxTokens = computed(() => settingsStore.maxTokens);


const promptTokensTotal = computed(() => store.promptTokensTotal);
const completionTokensTotal = computed(() => store.completionTokensTotal);
const totalPromptsSent = computed(() => store.totalPromptsSent);
const totalMoneySpent = computed(() => {
    const promptCost = (store.promptTokensTotal / 1000) * 0.03;
    const completionCost = (store.completionTokensTotal / 1000) * 0.06;
    return (promptCost + completionCost).toFixed(2);
});
</script>