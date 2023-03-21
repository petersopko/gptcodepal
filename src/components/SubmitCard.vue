<template>
    <n-card>
        <div class="flex justify-center">
            <n-radio-group v-model:value="promptSelection">
                <n-radio value="contextForGpt" @click="updatePromptSelection('contextForGpt')">Context for GPT</n-radio>
                <n-radio value="noContext" @click="updatePromptSelection('noContext')">No Context</n-radio>
            </n-radio-group>
        </div>
        <div class="flex justify-center">
            <n-button class="w-1/3 mt-4 mb-4" @click="submitPrompt">
                Submit 🚀 {{ `(Estimated tokens ${tokenCount || 0})` }}
            </n-button>
        </div>
        <div class="flex justify-center"><span>hello</span></div>
        <div class="flex justify-center">
            <n-input-number placeholder="Max tokens for answer" v-model:value="maxTokens" clearable min="0"
                @update:value="updateMaxTokens" />
        </div>
    </n-card>
</template>

<script setup>
import { NCard, NButton, NRadioGroup, NRadio, NInputNumber } from "naive-ui";
import { computed } from "vue";
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
</script>
