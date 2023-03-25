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
      <!-- {{ statsStore }} -->
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
import { NInput, NButton } from "naive-ui";
import { computed } from "vue";
import { useInputStore } from "../store/inputStore";

const emit = defineEmits(["submit"]);

const { inputStorage, updateInputText } = useInputStore();

const inputTextComputed = computed(() => inputStorage.inputText);

const submitPrompt = () => {
  emit("submit");
};
</script>
