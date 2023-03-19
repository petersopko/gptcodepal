import { defineStore } from "pinia";
import { ref } from "vue";

export const useApiKeyStore = defineStore("apiKeyStore", () => {
  const apiKey = ref(localStorage.getItem("openai_api_key") || "");

  function saveApiKey(key) {
    localStorage.setItem("openai_api_key", key);
    apiKey.value = key;
  }

  function $reset() {
    apiKey.value = "";
    localStorage.removeItem("openai_api_key");
  }

  return {
    apiKey,
    saveApiKey,
    $reset,
  };
});
