<template>
    <n-button @click="showModal = true">
        Stats & Settings 📊
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
        </n-card>
    </n-modal>
</template>

<script setup>
import { ref, computed } from "vue";
import ApiKeyInput from "./ApiKeyInput.vue";
import { useStatsStore } from "../../store/statsStore";

const store = useStatsStore();
const showModal = ref(false);

const promptTokensTotal = computed(() => store.promptTokensTotal);
const completionTokensTotal = computed(() => store.completionTokensTotal);
const totalPromptsSent = computed(() => store.totalPromptsSent);
const totalMoneySpent = computed(() => {
    const promptCost = (store.promptTokensTotal / 1000) * 0.03;
    const completionCost = (store.completionTokensTotal / 1000) * 0.06;
    return (promptCost + completionCost).toFixed(2);
});
</script>
