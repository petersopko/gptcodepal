import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessagesStore = defineStore("messagesStore", () => {
  const allMessages = ref(
    JSON.parse(localStorage.getItem("messagesStore")) || { 0: [] }
  );

  function addMessage(activeTabIndex, role, content) {
    if (!role) {
      // Create a new object with contents messages${activeTabIndex}: []
      allMessages.value[activeTabIndex] = [];
    } else {
      allMessages.value[activeTabIndex].push({
        role,
        content,
      });
    }
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
