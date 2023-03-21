import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessagesStore = defineStore("messagesStore", () => {
  const allMessages = ref(
    JSON.parse(localStorage.getItem("messagesStore") || '[{ "messages": []}]')
  );

  function addMessage(role, content, activeTabIndex) {
    allMessages.value[activeTabIndex].messages.push({ role, content });
    localStorage.setItem("messagesStore", JSON.stringify(allMessages.value));
  }

  function resetMessages() {
    allMessages.value = [];
  }

  return {
    allMessages,
    addMessage,
    resetMessages,
  };
});
