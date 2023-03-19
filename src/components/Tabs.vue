<template>
    <n-tabs :value="activeTabIndex" type="card" @update:value="updateActiveTab" :addable="addableRef" :closable="closable"
        tab-style="min-width: 80px;" @close="deleteTab" @add="addTab">
        <n-tab-pane v-for="(tab, index) in tabs" :key="index" :name="index"></n-tab-pane>
    </n-tabs>
</template>

<script setup>
import { computed } from "vue";
import { useTabsStore } from "../../store/tabsStore.js";

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
