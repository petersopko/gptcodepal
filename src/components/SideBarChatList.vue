<template>
  <n-scrollbar>
    <n-card
      v-for="(chat, index) in allChats"
      @click="updateActiveChat(index)"
      :content-style="{
        'justify-content': 'space-between',
        display: 'flex',
        'align-items': 'center',
      }"
      class="flex justify-between mx-4 my-4 w-auto"
      size="small"
      :style="{
        'border-color': `${
          activeChatIndex === index ? `${themeVar.primaryColor}` : 'black'
        }`,
      }"
    >
      <p class="ml-5">Chat {{ index }}</p>
      <n-button @click="($event) => deleteChat(index, $event)">
        <n-icon>
          <trash-outline />
        </n-icon>
      </n-button>
    </n-card>
  </n-scrollbar>
</template>

<script setup>
import { NCard, NButton, NIcon, useThemeVars, NScrollbar } from "naive-ui";
import { computed } from "vue";
import { TrashOutline } from "@vicons/ionicons5";
import { useChatStore } from "../store/chatStore.js";

const themeVar = useThemeVars();
const chatStore = useChatStore();

const allChats = computed(() => {
  return chatStore.allChats;
});

const activeChatMessages = computed(() => {
  return chatStore.activeChat.messages;
});
const activeChatIndex = computed(() => {
  return chatStore.activeChatIndex;
});

const updateActiveChat = (index) => {
  chatStore.updateActiveChat(index);
};

const deleteChat = (index, event) => {
  event.stopPropagation(); // Stop event propagation
  chatStore.deleteChat(index);
};
</script>
