<template>
    <n-page-header>
        <template #title>
            <a href="https://github.com/petersopko/gptcodepal/" style="text-decoration: none; color: inherit">
                GptCodePal
            </a>
        </template>

        <template #avatar>
            <n-avatar src="https://image.lexica.art/full_jpg/bac6aa81-cd0f-4da4-8cfa-2a0a5d1680c3" />
        </template>
        <template #extra>
            <n-space>
                <n-statistic label="Money Spent 💲" :value="`$${totalMoneySpent}`" class="mr-4" />
                <WipeSessionModal />
                <StatsSettingsModal />
            </n-space>
        </template>
    </n-page-header>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStatsStore } from '../../store/statsStore'
import WipeSessionModal from "./WipeSessionModal.vue";
import StatsSettingsModal from "./StatsSettingsModal.vue";

const store = useStatsStore();
onMounted(() => {
    const storedData = JSON.parse(localStorage.getItem("statsStore")) || {};
    store.promptTokensTotal = storedData.promptTokensTotal || 0;
    store.completionTokensTotal = storedData.completionTokensTotal || 0;
    store.totalPromptsSent = storedData.totalPromptsSent || 0;
});

const totalMoneySpent = computed(() => {
    const promptCost = (store.promptTokensTotal / 1000) * 0.03;
    const completionCost = (store.completionTokensTotal / 1000) * 0.06;
    return (promptCost + completionCost).toFixed(2);
});
</script>
