import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessagesStore = defineStore("messagesStore", () => {
  const messages = ref([]);

  function addMessage(role, content) {
    messages.value.push({ role, content });
  }

  function resetMessages() {
    messages.value = [];
  }

  return {
    messages,
    addMessage,
    resetMessages,
  };
});
