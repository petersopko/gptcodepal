import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useChatStore = defineStore("chatStore", () => {
  const allChats = ref(
    JSON.parse(localStorage.getItem("chatStore")) || [
      { messages: [], tokenCount: 0 },
    ]
  );
  const activeChatIndex = ref(0);
  const activeChat = computed(() => {
    console.log("activeChatIndex.value", allChats.value[activeChatIndex.value]);
    return allChats.value[activeChatIndex.value];
  });

  function updateActiveChat(index) {
    activeChatIndex.value = index;
  }

  function addChat() {
    allChats.value.push({ messages: [], tokenCount: 0 });
    updateActiveChat(allChats.value.length - 1);
    localStorage.setItem("chatStore", JSON.stringify(allChats.value));
  }

  function addMessage(activeChatIndex, role, content) {
    if (!role) {
      allChats.value.splice(activeChatIndex, 0, {
        messages: [],
        tokenCount: 0,
      });
    } else {
      allChats.value[activeChatIndex].messages.push({
        role,
        content,
      });
    }
    localStorage.setItem("chatStore", JSON.stringify(allChats.value));
  }

  function updateTokenCount(activeChatIndex, tokens) {
    allChats.value[activeChatIndex].tokenCount += tokens;
    localStorage.setItem("chatStore", JSON.stringify(allChats.value));
  }

  function deleteChat(index) {
    allChats.value.splice(index, 1);
    activeChatIndex.value = Math.min(
      activeChatIndex.value,
      allChats.value.length - 1
    );
    localStorage.setItem("chatStore", JSON.stringify(allChats.value));
    updateActiveChat(activeChatIndex.value);
  }

  function resetMessages() {
    allChats.value = [];
  }

  return {
    allChats,
    activeChat,
    activeChatIndex,
    addMessage,
    addChat,
    deleteChat,
    resetMessages,
    updateActiveChat,
    updateTokenCount,
  };
});
