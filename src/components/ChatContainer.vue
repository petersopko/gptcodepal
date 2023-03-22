<template>
    <div class="overlow-y-auto">
        <div v-for="message in activeChatMessages">
            <n-card :class="`${message.role}-message`">
                <ResponseContent :response="message.content" />
            </n-card>
        </div>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { NCard } from "naive-ui";
import ResponseContent from './ChatMessage.vue';
import { useChatStore } from "../store/chatStore";

const chatStore = useChatStore();

const activeChatMessages = computed(() => {
    return chatStore.allMessages[chatStore.activeChatIndex];
});
</script>
