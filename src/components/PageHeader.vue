<template>
    <n-grid cols="6">
        <n-grid-item span="2">
            <n-space vertical align="start">
                <a href="https://www.buymeacoffee.com/petersopko" target=”_blank”>
                    <n-button>☕</n-button>
                </a>
                <a href="https://github.com/petersopko/gptcodepal" target=”_blank”>
                    <n-button>🤖</n-button>
                </a>
            </n-space>
        </n-grid-item>
        <n-grid-item span="2">
            <n-space class="heading-title" justify="center">
                <n-h1>
                    GptCodePal 🤖
                </n-h1>
            </n-space>
        </n-grid-item>
        <n-grid-item span="2">
            <n-space vertical align="end">
                <StatsSettingsModal />
                <WipeSessionModal />
                <n-h3 class="price text-center mb-0" size="large">{{ `$ ${totalMoneySpent}` }}</n-h3>
            </n-space>
        </n-grid-item>
    </n-grid>
</template>
<script setup>
import { NButton, NGridItem, NGrid, NSpace, NH1, NH3 } from "naive-ui";
import { onMounted, computed } from "vue";
import { useStatsStore } from '../store/statsStore'
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
.price {
    width: 90px;
}

.heading-title {
    height: 100%;
    align-items: center;
}

.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
}

.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>