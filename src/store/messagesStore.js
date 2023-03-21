import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessagesStore = defineStore("messagesStore", () => {
  const allMessages = ref(
    JSON.parse(localStorage.getItem("messagesStore")) || [[]]
  );

  function addMessage(activeTabIndex, role, content) {
    if (!role) {
      allMessages.value.splice(activeTabIndex, 0, []);
    } else {
      allMessages.value[activeTabIndex].push({
        role,
        content,
      });
    }
    localStorage.setItem("messagesStore", JSON.stringify(allMessages.value));
  }

  function deleteMessage(index) {
    allMessages.value.splice(index, 1);
    localStorage.setItem("messagesStore", JSON.stringify(allMessages.value));
  }

  function resetMessages() {
    allMessages.value = [];
  }

  return {
    allMessages,
    addMessage,
    deleteMessage,
    resetMessages,
  };
});
