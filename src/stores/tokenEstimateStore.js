import { defineStore } from "pinia";
import { ref } from "vue";

export const useTokenEstimateStore = defineStore("tokenEstimate", () => {
  const tokenEstimate = ref(0);

  function updateTokenEstimate(newTokenEstimate) {
    tokenEstimate.value = newTokenEstimate;
  }

  function $reset() {
    tokenEstimate.value = 0;
  }

  return {
    tokenEstimate,
    updateTokenEstimate,
    $reset,
  };
});
