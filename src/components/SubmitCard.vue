<template>
  <n-card class="px-8" :bordered="false">
    <TextInput placeholder="Enter your prompt" @submit="submitPrompt" />
    <div class="flex justify-center mt-2">
      <n-gradient-text class="mr-6">
        {{ `Required Tokens: ${tokenEstimate ?? 0}` }}</n-gradient-text
      >
      <n-radio-group
        v-model:value="selectedRadio"
        default-value=""
        @update-value="updatePromptSelection($event)"
      >
        <n-radio
          v-for="context in promptContexts"
          :key="context.value"
          :value="context.value"
          :label="context.label"
        >
        </n-radio>
      </n-radio-group>
    </div>
  </n-card>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
import { NCard, NRadioGroup, NRadio, NGradientText } from "naive-ui";
import TextInput from "./TextInput.vue";
import { usePromptStore } from "../store/promptStore";
import { useChatStore } from "../store/chatStore";
import { useInputStore } from "../store/inputStore";
import useTokenCount from "../composables/useTokenCount";

const { promptSelection, promptContexts, updatePromptSelection } =
  usePromptStore();
const { tokenEstimate } = useTokenCount();
const { activeChat } = useChatStore();
const emit = defineEmits(["submit"]);
const selectedRadio = ref(promptSelection.value);

const submitPrompt = () => {
  emit("submit");
};
</script>
