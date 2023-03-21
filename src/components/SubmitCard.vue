<template>
    <n-card>
        <n-input-group>
            <TextInput placeholder="Enter your description" @submit="submitPrompt" />
        </n-input-group>
        <div class="flex justify-center mt-2">
            <n-radio-group v-model:value="promptSelection">
                <n-radio value="contextForGpt" @click="updatePromptSelection('contextForGpt')">Context for GPT</n-radio>
                <n-radio value="noContext" @click="updatePromptSelection('noContext')">No Context</n-radio>
            </n-radio-group>
        </div>
        <div class="flex justify-center mt-2">
            <n-radio-group>
                <n-radio>No Code Input</n-radio>
                <n-radio>Include Code Input</n-radio>
            </n-radio-group>
        </div>
        <n-collapse accordion>
            <n-collapse-item title="Stats & Settings">
                <n-grid>
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
                <div class="flex justify-center"><n-gradient-text>Max tokens for answer</n-gradient-text></div>
                <div class="flex justify-center">
                    <n-input-number placeholder="Max tokens for answer" v-model:value="maxTokens" clearable min="0"
                        @update:value="updateMaxTokens" />
                </div>
                <ApiKeyInput />
                <WipeSessionModal />
            </n-collapse-item>
        </n-collapse>
    </n-card>
</template>

<script setup>
import { NCard, NButton, NRadioGroup, NRadio, NInputNumber, NGrid, NGi, NStatistic, NGradientText, NInputGroup, NInput, NCollapse, NCollapseItem, NCollapseTransition } from "naive-ui";
import { computed } from "vue";
import ApiKeyInput from "./ApiKeyInput.vue";
import WipeSessionModal from "./WipeSessionModal.vue";
import TextInput from "./TextInput.vue";
import { useStatsStore } from "../store/statsStore";
import { useTabsStore } from "../store/tabsStore";
import { useSettingsStore } from "../store/settingsStore";
import { updatePromptSelection, promptSelection } from "../store/promptStore";

const emit = defineEmits(["submit"]);

const settingsStore = useSettingsStore();
const maxTokens = computed(() => settingsStore.maxTokens);
function updateMaxTokens(value) {
    settingsStore.saveMaxTokens(value);
}
const activeTabIndex = computed(() => tabsStore.activeTab);
const tabsStore = useTabsStore();
const statsStore = useStatsStore();
const activeTab = computed(() => tabsStore.activeTab);
const promptTokensTotal = computed(() => statsStore.promptTokensTotal);
const completionTokensTotal = computed(() => statsStore.completionTokensTotal);
const totalPromptsSent = computed(() => statsStore.totalPromptsSent);
const totalMoneySpent = computed(() => {
    const promptCost = (statsStore.promptTokensTotal / 1000) * 0.03;
    const completionCost = (statsStore.completionTokensTotal / 1000) * 0.06;
    return (promptCost + completionCost).toFixed(2);
});

const submitPrompt = () => {
    emit("submit");
};
</script>
