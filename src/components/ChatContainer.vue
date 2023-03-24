<template>
  <!-- todo: the loader should be in the response content component before the response is loaded -->
  <Loader />
  <n-scrollbar>
    <div v-for="message in activeChatMessages">
      <n-card :class="`${message.role}-message`">
        <ResponseContent :response="message.content" />
      </n-card>
    </div>
  </n-scrollbar>
</template>
<script setup>
import { computed } from "vue";
import { NCard, NScrollbar } from "naive-ui";
import ResponseContent from "./ChatMessage.vue";
import { useChatStore } from "../store/chatStore";
import Loader from "./Loader.vue";

const chatStore = useChatStore();

const activeChatMessages = computed(() => {
  return chatStore.allMessages[chatStore.activeChatIndex];
});
</script>
