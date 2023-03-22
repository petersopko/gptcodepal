import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useChatStore = defineStore("chatStore", () => {
  const allMessages = ref(
    JSON.parse(localStorage.getItem("chatStore")) || [[]]
  );

  const activeChatIndex = ref(0);
  const activeChat = computed(() => {
    return allMessages.value[activeChatIndex.value];
  });

  function updateActiveChat(index) {
    activeChatIndex.value = index;
  }

  function addChat() {
    allMessages.value.push([]);
    updateActiveChat(allMessages.value.length - 1);
    localStorage.setItem("chatStore", JSON.stringify(allMessages.value));
  }

  function addMessage(activeTabIndex, role, content) {
    if (!role) {
      allMessages.value.splice(activeTabIndex, 0, []);
    } else {
      allMessages.value[activeTabIndex].push({
        role,
        content,
      });
    }
    localStorage.setItem("chatStore", JSON.stringify(allMessages.value));
  }

  function deleteChat(index) {
    allMessages.value.splice(index, 1);
    activeChatIndex.value = Math.min(
      activeChatIndex.value,
      allMessages.value.length - 1
    );
    localStorage.setItem("chatStore", JSON.stringify(allMessages.value));
    updateActiveChat(activeChatIndex.value);
  }

  function resetMessages() {
    allMessages.value = [];
  }

  return {
    allMessages,
    activeChat,
    activeChatIndex,
    addMessage,
    addChat,
    deleteChat,
    resetMessages,
    updateActiveChat,
  };
});
