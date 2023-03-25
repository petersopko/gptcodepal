<template>
  <n-scrollbar>
    <div class="relative min-h-screen">
      <div class="flex justify-center items-center z-0 absolute inset-0">
        <PageHeader />
      </div>
      <div v-if="activeChatMessages" class="z-10 absolute inset-0">
        <div v-for="message in activeChatMessages">
          <n-card :class="`${message.role}-message`">
            <ChatMessage :response="message.content" />
          </n-card>
        </div>
      </div>
    </div>
  </n-scrollbar>
</template>
<script setup>
import { ref, watch } from "vue";
import { NCard, NScrollbar } from "naive-ui";
import ChatMessage from "./ChatMessage.vue";
import { useChatStore } from "../../store/chatStore";
import { useStatesStore } from "../../store/statesStore";
import PageHeader from "../PageHeader.vue";

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
