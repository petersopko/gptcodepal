<template>
  <n-card>
    <TextInput placeholder="Enter your prompt" @submit="submitPrompt" />
    <div class="flex justify-center mt-2">
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
import { NCard, NRadioGroup, NRadio } from "naive-ui";
import TextInput from "./TextInput.vue";
import { usePromptStore } from "../store/promptStore";

const { promptSelection, promptContexts, updatePromptSelection } =
  usePromptStore();
const promptStorage = usePromptStore();
const emit = defineEmits(["submit"]);
const selectedRadio = ref(promptSelection.value);

const submitPrompt = () => {
  emit("submit");
};
</script>
