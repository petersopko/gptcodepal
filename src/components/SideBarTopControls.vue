<template>
  <n-button class="w-full" size="large" @click="addChat">
    <p class="">Add Chat</p>
  </n-button>
</template>
<script setup>
import { NButton } from "naive-ui";
import { useChatStore } from "../store/chatStore.js";

const chatStore = useChatStore();

const addChat = () => {
  chatStore.addChat();
};
</script>
