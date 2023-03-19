import { defineStore } from "pinia";

export const useTokenEstimateStore = defineStore({
  id: "tokenEstimate",
  state: () => ({
    tokenEstimate: 0,
  }),
  actions: {
    updateTokenEstimate(newTokenEstimate) {
      this.tokenEstimate = newTokenEstimate;
    },
  },
});
