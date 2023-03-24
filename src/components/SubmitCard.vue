<template>
  <n-card>
    {{ promptSelectionHere }}
    <TextInput placeholder="Enter your prompt" @submit="submitPrompt" />
    <div class="flex justify-center mt-2">
      <n-radio-group v-model:value="promptSelectionHere">
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
import { NCard, NRadioGroup, NRadio } from "naive-ui";
import TextInput from "./TextInput.vue";
import { usePromptStore } from "../store/promptStore";

const emit = defineEmits(["submit"]);

const { promptSelection, promptContexts, updatePromptSelection } =
  usePromptStore();
const promptSelectionHere = ref(promptSelection.value);

watchEffect(() => {
  updatePromptSelection(promptSelectionHere.value);
});

const submitPrompt = () => {
  emit("submit");
};
</script>
