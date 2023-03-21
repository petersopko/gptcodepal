<template>
    <n-card>
        <div class="flex justify-center">
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

        </div>
        <!-- this should be in a grid -->
        <div class="flex justify-center">
            <n-button class="w-1/3 mt-4 mb-4" @click="submitPrompt">
                Submit 🚀 {{ `(Estimated tokens ${tokenCount || 0})` }}
            </n-button>
        </div>
        <div class="flex justify-center mt-2">
            <n-radio-group v-model:value="promptSelection">
                <n-radio value="contextForGpt" @click="updatePromptSelection('contextForGpt')">Context for GPT</n-radio>
                <n-radio value="noContext" @click="updatePromptSelection('noContext')">No Context</n-radio>
            </n-radio-group>
        </div>
        <n-card class="mt-4">
            <div class="flex justify-center"><n-gradient-text>Max tokens for answer</n-gradient-text></div>
            <div class="flex justify-center">
                <n-input-number placeholder="Max tokens for answer" v-model:value="maxTokens" clearable min="0"
                    @update:value="updateMaxTokens" />
            </div>
            <div class="flex justify-center mt-2">
                <ApiKeyInput />
                <WipeSessionModal />

            </div>
        </n-card>
    </n-card>
</template>

<script setup>
import { NCard, NButton, NRadioGroup, NRadio, NInputNumber, NGrid, NGi, NStatistic, NGradientText } from "naive-ui";
import { computed } from "vue";
import ApiKeyInput from "./ApiKeyInput.vue";
import WipeSessionModal from "./WipeSessionModal.vue";
import { useStatsStore } from "../store/statsStore";
import { useTabsStore } from "../store/tabsStore";
import { useSettingsStore } from "../store/settingsStore";
import { countTokens } from "../composables/useTokenCount";
import { promptSelection, updatePromptSelection, contextForGpt, noContext } from "../store/promptStore";

const emit = defineEmits(["submit"]);
const settingsStore = useSettingsStore();
const maxTokens = computed(() => settingsStore.maxTokens);
function updateMaxTokens(value) {
    settingsStore.saveMaxTokens(value);
}

const tabsStore = useTabsStore();
const statsStore = useStatsStore();
const activeTab = computed(() => tabsStore.activeTab);
const tokenCount = computed(() => {
    const context = promptSelection.value === 'contextForGpt' ? contextForGpt : noContext;
    const text = `${context}${activeTab.value.description}${activeTab.value.codeInputs
        .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
        .join("")}`;

    if (!text) {
        return 0;
    }
    return countTokens(text);
});
const submitPrompt = () => {
    emit("submit");
};
const promptTokensTotal = computed(() => statsStore.promptTokensTotal);
const completionTokensTotal = computed(() => statsStore.completionTokensTotal);
const totalPromptsSent = computed(() => statsStore.totalPromptsSent);
const totalMoneySpent = computed(() => {
    const promptCost = (statsStore.promptTokensTotal / 1000) * 0.03;
    const completionCost = (statsStore.completionTokensTotal / 1000) * 0.06;
    return (promptCost + completionCost).toFixed(2);
});
</script>
