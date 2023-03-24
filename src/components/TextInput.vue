<template>
  <n-input
    placeholder="Ask and you shall receive 🤖"
    type="textarea"
    :autosize="{ minRows: 1, maxRows: 10 }"
    :value="inputTextComputed"
    @input="updateInputText($event)"
    @keydown.enter.prevent="submitPrompt"
  >
    <template #suffix>
      <n-button
        :bordered="false"
        :disabled="!inputTextComputed"
        @click="submitPrompt"
      >
        🚀
      </n-button>
      <!-- {{ `(Estimated tokens ${tokenCount || 0})` }} -->
    </template>
  </n-input>
</template>

<script setup>
import { NCard, NInput, NButton } from "naive-ui";
import { computed } from "vue";
import { useInputStore } from "../store/inputStore";
import { useSettingsStore } from "../store/settingsStore";
import { countTokens } from "../composables/useTokenCount";

const props = defineProps({
  placeholder: String,
});

const emit = defineEmits(["submit"]);

const settingsStore = useSettingsStore();
const maxTokens = computed(() => settingsStore.maxTokens);

const { inputStorage, updateInputText } = useInputStore();

const inputTextComputed = computed(() => inputStorage.inputText);

// const tokenCount = computed(() => {
//     const context = promptSelection.value === 'contextForGpt' ? contextForGpt : noContext;
//     const text = `${context}${inputText.value}${tabsStore.activeTab.codeInputs
//         .map((chunk) => `\n${chunk.name}\n\`\`\`${chunk.code}\`\`\``)
//         .join("")}`;

//     if (!text) {
//         return 0;
//     }
//     return countTokens(text);
// });

const submitPrompt = () => {
  emit("submit");
};
</script>
