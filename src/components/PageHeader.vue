<template>
    <n-page-header>
        <template #title>
            <a href="https://github.com/petersopko/gptcodepal/" style="text-decoration: none; color: inherit">
                <n-gradient-text gradient="linear-gradient(90deg, red 0%, green 50%, blue 100%)">
                    GptCodePal
                </n-gradient-text>
            </a>
        </template>
        <template #avatar>
            <n-avatar src="https://image.lexica.art/full_jpg/bac6aa81-cd0f-4da4-8cfa-2a0a5d1680c3" />
        </template>
        <template #extra>
            <div>
                <div>
                    <n-space>
                        <WipeSessionModal />
                        <StatsSettingsModal />
                    </n-space>
                </div>
                <div class="flex justify-center mt-4">
                    <n-statistic label=" This Session 💲" :value="`$${totalMoneySpent}`" class="text-center mr-4" />
                </div>
            </div>
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
<style scoped>
.n-gradient-text {
    font-size: 2rem;
}

.n-avatar {
    width: 100px;
    height: 100px;
}
</style>