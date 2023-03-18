import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatsStore = defineStore("main", () => {
  const promptTokensTotal = ref(0);
  const completionTokensTotal = ref(0);
  const totalPromptsSent = ref(0);

  function incrementPromptTokens(tokens) {
    promptTokensTotal.value += tokens;
  }

  function incrementCompletionTokens(tokens) {
    completionTokensTotal.value += tokens;
  }

  function incrementTotalPromptsSent() {
    totalPromptsSent.value++;
  }

  return {
    promptTokensTotal,
    completionTokensTotal,
    totalPromptsSent,
    incrementPromptTokens,
    incrementCompletionTokens,
    incrementTotalPromptsSent,
  };
});
