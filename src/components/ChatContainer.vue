<template>
  <n-scrollbar>
    <div v-if="activeChatMessages">
      <div v-for="message in activeChatMessages">
        <n-card :class="`${message.role}-message`">
          <ChatMessage :response="message.content" />
        </n-card>
      </div>
    </div>
  </n-scrollbar>
</template>
<script setup>
import { ref, watch } from "vue";
import { NCard, NScrollbar } from "naive-ui";
import ChatMessage from "./ChatMessage.vue";
import { useChatStore } from "../store/chatStore";
import { useStatesStore } from "../store/statesStore";

const chatStore = useChatStore();

const activeChatMessages = ref([]);

watch(
  () => chatStore.activeChat,
  (newValue) => {
    activeChatMessages.value = newValue?.messages;
  },
  { immediate: true }
);
</script>
