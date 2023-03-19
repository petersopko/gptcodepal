import { defineStore } from "pinia";

export const useApiKeyStore = defineStore({
  id: "apiKeyStore",
  state: () => ({
    apiKey: localStorage.getItem("openai_api_key") || "",
  }),
  actions: {
    saveApiKey(key) {
      localStorage.setItem("openai_api_key", key);
      this.apiKey = key;
    },
  },
});
