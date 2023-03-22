<template>
    <n-input placeholder="Ask and you shall receive 🤖" type="textarea" :autosize="{ minRows: 1, maxRows: 10 }"
        :value="inputText" @input="updateInput($event)" @keydown.enter.prevent="submitPrompt">
        <template #suffix>
            <button :disabled="!inputText" @click="submitPrompt">
                🚀
            </button>
            <!-- {{ `(Estimated tokens ${tokenCount || 0})` }} -->
        </template></n-input>
</template>

<script setup>
import { NCard, NInput, NButton } from "naive-ui";
import { computed } from "vue";
import { useInputStore } from "../store/inputStore";
import { useSettingsStore } from "../store/settingsStore";
import { countTokens } from "../composables/useTokenCount";
import { promptSelection, contextForGpt, noContext } from "../store/promptStore";
const props = defineProps({
    placeholder: String,
});

const emit = defineEmits(["submit"]);

const settingsStore = useSettingsStore();
const maxTokens = computed(() => settingsStore.maxTokens);

const inputStore = useInputStore();

const updateInput = (value) => {
    inputStore.updateInput(value);
};

const inputText = computed(() => {
    inputStore.inputStorage.inputText;
    console.log(inputStore);
});

const tokenCount = computed(() => {
    const context = promptSelection.value === 'contextForGpt' ? contextForGpt : noContext;
    const text = `${context}${inputText.value}${tabsStore.activeTab.codeInputs
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
