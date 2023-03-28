<template>
  <n-button @click="addChat">
    <n-icon size="20"><add-sharp /></n-icon>
  </n-button>
</template>
<script setup>
import { NButton, NIcon } from "naive-ui";
import { AddSharp } from "@vicons/ionicons5";
import { useChatStore } from "../../store/chatStore.js";

const chatStore = useChatStore();

const addChat = () => {
  chatStore.addChat();
};
</script>
