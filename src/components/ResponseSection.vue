<template>
    <n-card>
        <ResponseContent :response="response" />
    </n-card>
</template>

<script setup>
import { computed } from "vue";
import { NCard } from "naive-ui";
import ResponseContent from './Chat.vue';
import { useMessagesStore } from "../store/messagesStore";

const messagesStore = useMessagesStore();

const response = computed(() => {
    return messagesStore.allMessages[props.activeTabIndex].messages[messagesStore.allMessages[props.activeTabIndex].messages.length - 1].content;
});

const props = defineProps({
    activeTabIndex: Number,
});
</script>
