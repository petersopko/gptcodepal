import { defineStore } from "pinia";
import { ref } from "vue";

export const useSettingsStore = defineStore("settingsStore", () => {
  const apiKey = ref(localStorage.getItem("openai_api_key") || "");
  const maxTokens = ref(parseInt(localStorage.getItem("max_tokens")) || 0);

  function saveApiKey(key) {
    localStorage.setItem("openai_api_key", key);
    apiKey.value = key;
  }

  function saveMaxTokens(value) {
    localStorage.setItem("max_tokens", value);
    maxTokens.value = value;
  }

  function $reset() {
    apiKey.value = "";
    localStorage.removeItem("openai_api_key");
    maxTokens.value = 0;
    localStorage.removeItem("max_tokens");
  }

  return {
    apiKey,
    maxTokens,
    saveApiKey,
    saveMaxTokens,
    $reset,
  };
});
