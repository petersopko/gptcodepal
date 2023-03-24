import { defineStore } from "pinia";
import { ref } from "vue";

export const useStatsStore = defineStore("main", () => {
  const storedStats = localStorage.getItem("statsStore");

  const promptTokensTotal = ref(
    storedStats ? JSON.parse(storedStats).promptTokensTotal : 0
  );

  const completionTokensTotal = ref(
    storedStats ? JSON.parse(storedStats).completionTokensTotal : 0
  );

  const totalPromptsSent = ref(
    storedStats ? JSON.parse(storedStats).totalPromptsSent : 0
  );
  function incrementPromptTokens(tokens) {
    promptTokensTotal.value += tokens;
  }

  function incrementCompletionTokens(tokens) {
    completionTokensTotal.value += tokens;
  }

  function incrementTotalPromptsSent() {
    totalPromptsSent.value++;
  }

  // statsStore.js

  function updateStats(promptTokensCount, completionTokensCount) {
    console.log("updateStats", promptTokensCount, completionTokensCount);
    incrementPromptTokens(promptTokensCount);
    incrementCompletionTokens(completionTokensCount);
    incrementTotalPromptsSent();

    const simplifiedStatsStore = {
      promptTokensTotal: promptTokensTotal.value,
      completionTokensTotal: completionTokensTotal.value,
      totalPromptsSent: totalPromptsSent.value,
    };

    localStorage.setItem("statsStore", JSON.stringify(simplifiedStatsStore));
  }

  function $reset() {
    promptTokensTotal.value = 0;
    completionTokensTotal.value = 0;
    totalPromptsSent.value = 0;
  }

  return {
    promptTokensTotal,
    completionTokensTotal,
    totalPromptsSent,
    incrementPromptTokens,
    incrementCompletionTokens,
    incrementTotalPromptsSent,
    updateStats,
    $reset,
  };
});
