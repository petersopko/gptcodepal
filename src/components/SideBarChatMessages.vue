<template>
    <div class="tabs-container">
        <div class="my-4 text-center">
            <n-button size="large" @click="addChat">
                <p class="mx-12">Add Chat</p>
            </n-button>
        </div>
        <n-card v-for="(tab, index) in allChats" @click="updateActiveChat(index)" :content-style="{
            'justify-content': 'space-between',
            'display': 'flex',
            'align-items': 'center'
        }" class="flex justify-between mx-4 my-4 w-auto" size="small">
            <p class="ml-5">Chat {{ index }}</p>
            <n-button icon="trash-alt" class="text-red" @click="deleteChat(index)">
                <n-icon>
                    <trash-outline />
                </n-icon>
            </n-button>
        </n-card>
    </div>
</template>


<script setup>
import { NCard, NButton, NIcon } from "naive-ui";
import { computed } from "vue";
import { useTabsStore } from "../store/tabsStore.js";
import { TrashOutline } from "@vicons/ionicons5";
import { useChatStore } from "../store/chatStore.js";

const tabsStore = useTabsStore();
const chatStore = useChatStore();

const updateActiveChat = (index) => {
    chatStore.updateActiveChat(index);
};

// const updateActiveTab = (index) => {
//     tabsStore.updateActiveTab(index);
// };

// const addTab = () => {
//     tabsStore.addTab();
// };

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