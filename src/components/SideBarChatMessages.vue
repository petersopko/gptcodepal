<template>
    <div class="tabs-container">
        <div class="grid grid-cols-9 my-4">
            <n-button class="col-start-2 col-span-3" size="large" @click="addChat">
                <p class="">Add Chat</p>
            </n-button>
            <n-button class="col-start-8" @click="addChat">
                <n-icon>
                    <trash-outline />
                </n-icon>
            </n-button>
        </div>
        <n-card v-for="(tab, index) in allChats" @click="updateActiveChat(index)" :content-style="{
            'justify-content': 'space-between',
            'display': 'flex',
            'align-items': 'center',
        }" class="flex justify-between mx-4 my-4 w-auto" size="small"
            :style="{ 'border-color': `${activeChatIndex === index ? `${themeVar.primaryColor}` : 'black'}` }">
            <p class="ml-5">Chat {{ index }}</p>
            <n-button @click="deleteChat(index)">
                <n-icon>
                    <trash-outline />
                </n-icon>
            </n-button>
        </n-card>
    </div>
</template>


<script setup>
import { NCard, NButton, NIcon, useThemeVars } from "naive-ui";
import { computed } from "vue";
import { useTabsStore } from "../store/tabsStore.js";
import { TrashOutline } from "@vicons/ionicons5";
import { useChatStore } from "../store/chatStore.js";

const tabsStore = useTabsStore();
const themeVar = useThemeVars();
const chatStore = useChatStore();

const updateActiveChat = (index) => {
    chatStore.updateActiveChat(index);
};


const addChat = () => {
    chatStore.addChat();
};


const deleteChat = (index) => {
    chatStore.deleteChat(index);
};

const allChats = computed(() => {
    return chatStore.allMessages;
});

const activeChatIndex = computed(() => {
    return chatStore.activeChatIndex;
});

</script>