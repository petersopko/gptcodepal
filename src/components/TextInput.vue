<template>
    <n-input placeholder="Ask and you shall receive 🤖" type="textarea" :autosize="{ minRows: 1, maxRows: 10 }"
        :value="description" @input="updateDescription($event)" @keydown.enter="submitPrompt">
        <template #suffix>
            <button class="text-gray-700" :disabled="!description" @click="submitPrompt">
                🚀
            </button>
            <!-- {{ `(Estimated tokens ${tokenCount || 0})` }} -->
        </template></n-input>
</template>

<script setup>
import { NCard, NInput, NButton } from "naive-ui";
import { computed } from "vue";
import { useTabsStore } from "../store/tabsStore";
import { useSettingsStore } from "../store/settingsStore";
import { countTokens } from "../composables/useTokenCount";
import { promptSelection, contextForGpt, noContext } from "../store/promptStore";
const props = defineProps({
    placeholder: String,
});

const emit = defineEmits(["submit"]);

const settingsStore = useSettingsStore();
const maxTokens = computed(() => settingsStore.maxTokens);

const tabsStore = useTabsStore();
const description = computed(() => tabsStore.activeTab.description);

const updateDescription = (event) => {
    tabsStore.updateDescription(event);
}

const tokenCount = computed(() => {
    const context = promptSelection.value === 'contextForGpt' ? contextForGpt : noContext;
    const text = `${context}${description.value}${tabsStore.activeTab.codeInputs
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
