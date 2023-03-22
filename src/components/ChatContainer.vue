<template>
    <div>
        <div v-for="message in activeTabMessages">
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
import { useMessagesStore } from "../store/messagesStore";
import { useTabsStore } from "../store/tabsStore";

const messagesStore = useMessagesStore();
const tabsStore = useTabsStore();

const activeTabMessages = computed(() => {
    return messagesStore.allMessages[tabsStore.activeTabIndex];
});



</script>
