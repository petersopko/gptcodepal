<template>
    <n-card v-for="message in activeTabMessages">
        <ResponseContent :response="message.content" />
    </n-card>
</template>

<script setup>
import { computed } from "vue";
import { NCard } from "naive-ui";
import ResponseContent from './Chat.vue';
import { useMessagesStore } from "../store/messagesStore";

const messagesStore = useMessagesStore();
const props = defineProps({
    activeTabIndex: Number,
});
const activeTabMessages = messagesStore.allMessages[props.activeTabIndex];

const response = computed(() => {
    return activeTabMessages[activeTabMessages.length - 1].content || null;
});


</script>
