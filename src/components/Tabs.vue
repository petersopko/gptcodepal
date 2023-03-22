<template>
    <div>
        <n-button @click="addTab">Add Tab</n-button>
        <div v-for="(tab, index) in tabsStore.tabs">
            <n-card class="mx-4">Chat {{ index }}</n-card>
        </div>
    </div>
</template>

<script setup>
import { NTabs, NCard, NButton } from "naive-ui";
import { computed } from "vue";
import { useTabsStore } from "../store/tabsStore.js";

const tabsStore = useTabsStore();

const updateActiveTab = (index) => {
    tabsStore.updateActiveTab(index);
};

const addTab = () => {
    tabsStore.addTab();
};

const deleteTab = (index) => {
    tabsStore.deleteTab(index);
};



const tabs = computed(() => {
    return tabsStore.tabs;
});
const addableRef = computed(() => {
    return {
        disabled: tabsStore.tabs.length >= 10,
    };
});

const closable = computed(() => {
    return tabsStore.tabs.length > 1;
});
const activeTabIndex = computed(() => {
    return tabsStore.activeTabIndex;
});
</script>
