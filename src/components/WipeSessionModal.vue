<template>
    <n-button @click="showModal = true">
        Wipe Session 🧹
    </n-button>
    <n-modal v-model:show="showModal" preset="dialog" title="WARNING" :content="warningMessage" positive-text="Submit"
        :positiveButtonProps="{ type: 'default' }" negative-text="Cancel" @positive-click="submitCallback"
        @negative-click="cancelCallback" />
</template>

<script setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { useStatsStore } from "../../store/statsStore";
import { useTabsStore } from "../../store/tabsStore";

const message = useMessage();
const statsStore = useStatsStore()// Access the store
const tabsStore = useTabsStore(); // Access the store
const showModal = ref(false);
const warningMessage =
    "All of the data in this session, including API key will be wiped. Are you sure you want to continue?";

const cancelCallback = () => {
    message.success("Cancel");
};

const submitCallback = () => {
    statsStore.$reset();
    tabsStore.$reset();
    localStorage.clear();
    showModal.value = false;
    message.success("Submit");
};
</script>
